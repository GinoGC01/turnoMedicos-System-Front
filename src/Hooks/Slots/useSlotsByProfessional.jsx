import { useEffect, useState, useCallback } from "react";
import { SlotsController } from "../../Controllers/slots.controller";

export default function useSlotsByProfessional({ id, services }) {
  const [slots, setSlots] = useState([]);
  const [slotsByServices, setSlotsByServices] = useState([]);

  // Función para convertir tiempo en formato "HH:MM:SS" a minutos
  const timeToMinutes = useCallback((time) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 60 + minutes + seconds / 60;
  }, []);

  // Función para calcular la duración de un slot en minutos
  const calculateSlotDuration = useCallback(
    (startTime, endTime) => {
      const startMinutes = timeToMinutes(startTime);
      const endMinutes = timeToMinutes(endTime);
      return endMinutes - startMinutes;
    },
    [timeToMinutes]
  );

  // Función para agrupar los slots por día
  const groupByDay = useCallback((slots) => {
    return slots.reduce((result, slot) => {
      const date = slot.date.split("T")[0]; // Extrae la fecha (YYYY-MM-DD)
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push(slot);
      return result;
    }, {});
  }, []);

  // Obtener los slots del profesional
  const getSlots = useCallback(async () => {
    try {
      const response = await SlotsController.GetSlotsByProfessional(id);
      setSlots(response.allSlotsByProfessional);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  // Calcular los slots disponibles para cada servicio
  useEffect(() => {
    if (slots.length > 0 && services.length > 0) {
      const slotsGroupedByDay = groupByDay(slots); // Agrupa los slots por día

      const newSlotsByServices = services.map((service) => {
        const turnosPorDia = {};

        // Procesar los slots de cada día
        Object.entries(slotsGroupedByDay).forEach(([date, slotsDelDia]) => {
          const turnos = [];
          let remainingDuration = service.duration; // Duración restante del servicio
          let currentSlotIndex = 0;

          while (remainingDuration > 0 && currentSlotIndex < slotsDelDia.length) {
            const currentDay = new Date()
            const slotPrincipal = slotsDelDia[currentSlotIndex];
            const slotPrincipalDay = new Date(slotPrincipal.date)

            // Verificar si el slot principal está disponible
            if (slotPrincipal.status === "available" && slotPrincipalDay >= currentDay) {
              const grupoTurnos = [slotPrincipal]; // Iniciar el grupo con el slot principal
              let duracionAcumulada = calculateSlotDuration(
                slotPrincipal.startTime,
                slotPrincipal.endTime
              ); // Duración acumulada del grupo

              // Recorrer los siguientes slots para completar la duración del servicio
              let nextSlotIndex = currentSlotIndex + 1;
              while (
                duracionAcumulada < service.duration &&
                nextSlotIndex < slotsDelDia.length
              ) {
                const nextSlot = slotsDelDia[nextSlotIndex];

                // Verificar si el siguiente slot está disponible y es consecutivo
                if (
                  nextSlot.status === "available" &&
                  nextSlot.startTime === slotPrincipal.endTime
                ) {
                  grupoTurnos.push(nextSlot);
                  duracionAcumulada += calculateSlotDuration(
                    nextSlot.startTime,
                    nextSlot.endTime
                  );
                }

                nextSlotIndex++;
              }

              // Si el grupo de slots cumple con la duración del servicio, agregarlo a turnos
              if (duracionAcumulada >= service.duration) {
                turnos.push({
                  turno: slotPrincipal.startTime, // Slot principal
                  grupoTurnos: grupoTurnos, // Grupo completo de slots
                });
              }

              // Avanzar al siguiente slot principal
              currentSlotIndex = nextSlotIndex;
            } else {
              // Si el slot no está disponible, avanzar al siguiente
              currentSlotIndex++;
            }
          }

          // Agregar los turnos de este día al objeto turnosPorDia
          if (turnos.length > 0) {
            turnosPorDia[date] = turnos;
          }
        });

        return {
          title: service.title,
          duration: service.duration,
          turnosPorDia: turnosPorDia, // Turnos agrupados por día
        };
      });

      setSlotsByServices(newSlotsByServices);
    }
  }, [slots, services, calculateSlotDuration, groupByDay]);

  // Obtener los slots al montar el componente o cuando cambie el id
  useEffect(() => {
    getSlots();
  }, [getSlots]);

  return { slots, slotsByServices };
}