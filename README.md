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



---
# Hook: `useReserveSlot`

## Descripción
El hook `useReserveSlot` es una utilidad diseñada para manejar la reserva de un turno. Este hook se encarga de validar los datos del formulario, realizar la solicitud para crear una orden de reserva y manejar los errores y estados de carga, junto con la redirección a la página encargada de gestionar los pagos.

---

## Cómo funciona
1. **Valida los datos del formulario**: Usa la función `formValidation` para asegurarse de que los datos ingresados por el usuario sean válidos.
2. **Realiza la reserva**: Envía los datos del formulario y el ID del turno al controlador `SlotsController.CreateOrder` para crear la orden de reserva.
3. **Maneja errores y estados de carga**: Actualiza el estado de `responseError` y `loader` según el resultado de la operación.

---

## Parámetros
El hook acepta un objeto con las siguientes propiedades:

| Parámetro   | Tipo       | Descripción                                                                 |
|-------------|------------|-----------------------------------------------------------------------------|
| `turno`     | `Object`   | Un objeto que representa el turno seleccionado. Debe contener un arreglo `grupoTurnos` con al menos un slot. |
| `serviceId` | `string`   | El ID del servicio asociado al turno.                                       |

---

## Valores de retorno
El hook retorna un objeto con las siguientes propiedades:

| Propiedad       | Tipo       | Descripción                                                                 |
|-----------------|------------|-----------------------------------------------------------------------------|
| `responseError` | `Object`   | Un objeto que indica si hubo un error durante la reserva. Contiene `status` (booleano) y `message` (string). |
| `loader`        | `boolean`  | Indica si la reserva está en proceso (`true`) o no (`false`).              |
| `handlerSubmit` | `Function` | Función que maneja el envío del formulario. Recibe el evento `submit` como parámetro. |

---

## Ejemplo de uso

```javascript
import useReserveSlot from './hooks/useReserveSlot';

function ReserveSlotForm({ turno, serviceId }) {
  const { responseError, loader, handlerSubmit } = useReserveSlot({ turno, serviceId });

  return (
    <form onSubmit={handlerSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required />
      </div>
      <div>
        <label htmlFor="dni">DNI:</label>
        <input type="text" id="dni" name="dni" required />
      </div>
      <div>
        <label htmlFor="edad">Edad:</label>
        <input type="number" id="edad" name="edad" required />
      </div>
      <button type="submit" disabled={loader}>
        {loader ? "Reservando..." : "Reservar"}
      </button>
      {responseError.status && <p style={{ color: "red" }}>{responseError.message}</p>}
    </form>
  );
}
``` 

## Estructura de turno
# El parámetro turno debe tener la siguiente estructura:

```javascript
{
  grupoTurnos: [
    {
      _id: "67cf45d33e2383281e1ab0bc", // ID del slot
      startTime: "09:00:00", // Hora de inicio
      endTime: "09:30:00",   // Hora de fin
      status: "available"     // Estado del slot
    },
    // Más slots...
  ]
}
```

## Flujo de trabajo

1. El usuario completa el formulario y hace clic en "Reservar".

2. El hook valida los datos del formulario usando formValidation.

3. Si la validación falla, se muestra un mensaje de error.

4. Si la validación es exitosa, se envía la solicitud al backend usando SlotsController.CreateOrder.

5. Si la reserva es exitosa, el usuario es redirigido a la URL proporcionada por el backend (response.urlFront).

6. Si ocurre un error, se muestra en la consola y se actualiza el estado de responseError.

## Ejemplo de datos de entrada
# turno
``` javascript
Copy
const turno = {
  grupoTurnos: [
    {
      _id: "67cf45d33e2383281e1ab0bc",
      startTime: "09:00:00",
      endTime: "09:30:00",
      status: "available",
    },
  ],
};
```
# serviceId
``` javascript
Copy
const serviceId = "svc001";
```
## Conclusión
El hook `useReserveSlot` es una herramienta útil para manejar la reserva de turnos en aplicaciones de agendamiento. Con una implementación clara y una documentación detallada, este hook puede ser fácilmente integrado en cualquier formulario de reserva. *El hook esta en su version beta, se encuentra actualmente en desarrollo para mejor dinámica y adaptabilidad*