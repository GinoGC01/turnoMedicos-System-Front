# Hook: `useSlotsByProfessional`

## Descripción
El hook `useSlotsByProfessional` es una utilidad diseñada para gestionar y organizar los slots (franjas horarias) disponibles de un profesional, en función de la duración de sus servicios. Este hook es especialmente útil en aplicaciones de agendamiento, donde se necesita mostrar los horarios disponibles para cada servicio ofrecido por un profesional.

---

## Cómo funciona
1. **Obtiene los slots del profesional**: Realiza una solicitud asíncrona para obtener los slots disponibles del profesional.
2. **Agrupa los slots por servicio**: Para cada servicio, calcula los slots necesarios en función de su duración y los agrupa en "turnos".
3. **Retorna los datos organizados**: Proporciona los slots disponibles y los turnos agrupados por servicio.

---

## Parámetros
El hook acepta un objeto con las siguientes propiedades:

| Parámetro   | Tipo       | Descripción                                                                 |
|-------------|------------|-----------------------------------------------------------------------------|
| `id`        | `string`   | El ID del profesional cuyos slots se desean obtener.                        |
| `services`  | `Array`    | Un arreglo de servicios, donde cada servicio tiene una duración específica. |

---

## Valores de retorno
El hook retorna un objeto con las siguientes propiedades:

| Propiedad         | Tipo       | Descripción                                                                 |
|-------------------|------------|-----------------------------------------------------------------------------|
| `slots`           | `Array`    | Un arreglo con todos los slots disponibles del profesional.                 |
| `slotsByServices` | `Array`    | Un arreglo de objetos, donde cada objeto representa un servicio con sus turnos disponibles. |

### Estructura de `slotsByServices`
Cada objeto en `slotsByServices` tiene la siguiente estructura:

```javascript
{
  title: "Nombre del servicio",
  duration: 60, // Duración del servicio en minutos
  turnos: [
    {
      turno: "09:00:00", // Hora de inicio del slot principal
      grupoTurnos: [
        { /* Slot 1 */ },
        { /* Slot 2 */ },
        // ...
      ]
    },
    // Más turnos...
  ]
}

```
---

## Ejemplo de Uso

```javascript
import useSlotsByProfessional from "./hooks/useSlotsByProfessional";

function ProfessionalSchedule({ professionalId, services }) {
  const { slots, slotsByServices } = useSlotsByProfessional({
    id: professionalId,
    services,
  });

  return (
    <div>
      <h2>Slots disponibles</h2>
      <ul>
        {slotsByServices.map((service, index) => (
          <li key={index}>
            <h3>{service.title}</h3>
            <p>Duración: {service.duration} minutos</p>
            <ul>
              {service.turnos.map((turno, turnoIndex) => (
                <li key={turnoIndex}>
                  <strong>Turno: {turno.turno}</strong>
                  <ul>
                    {turno.grupoTurnos.map((slot, slotIndex) => (
                      <li key={slotIndex}>
                        {slot.startTime} - {slot.endTime} (Duración:{" "}
                        {calculateSlotDuration(slot.startTime, slot.endTime)} minutos)
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

```
---

## Consideraciones importantes

1. **Dependencias externas**:

El hook depende de SlotsController.GetSlotsByProfessional para obtener los slots del profesional. Asegúrate de que esta función esté correctamente implementada y disponible.

2. **Formato de los slots**:

Los slots deben tener un formato específico, con propiedades como startTime, endTime, y status. Asegúrate de que los datos devueltos por SlotsController.GetSlotsByProfessional cumplan con este formato.

3. **Optimización**:

El hook utiliza useCallback para memorizar funciones y evitar recreaciones innecesarias. Esto mejora el rendimiento, especialmente en aplicaciones con muchos slots y servicios.

4. **Orden de los slots**:

Los slots deben estar ordenados por fecha y hora. Si no lo están, el hook puede no funcionar correctamente.

## Errores comunes

1. **Slots no disponibles**:

Si no hay slots disponibles para un servicio, el arreglo turnos estará vacío.

2. **Duración insuficiente**:

Si la duración de un servicio no puede ser cubierta por los slots disponibles, el hook no generará turnos para ese servicio.

3. **Dependencias faltantes**:

Asegúrate de incluir todas las dependencias en los useEffect y useCallback para evitar comportamientos inesperados.

---
# Conclusión

El hook `useSlotsByProfessional` es una herramienta poderosa para gestionar y organizar los slots disponibles de un profesional en función de la duración de sus servicios. Con una implementación clara y una documentación detallada, este hook puede ser fácilmente integrado en cualquier aplicación de agendamiento.