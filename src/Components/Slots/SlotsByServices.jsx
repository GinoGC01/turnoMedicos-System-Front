import React from 'react'
import useOpen from '../../Hooks/useOpen';

export default function SlotsByServices({fecha, turnos}) {
    const {open, handlerOpen} = useOpen()
  return (
        <div>
             <button onClick={handlerOpen}>Fecha: {fecha}</button>
            {open && <ul>
              {turnos.map((turno, turnoIndex) => (
                <li key={turnoIndex}>
                  <strong>Turno: {turno.turno}</strong>
                  {/* <ul>
                    {turno.grupoTurnos.map((slot, slotIndex) => (
                      <li key={slotIndex}>
                        {slot.startTime} - {slot.endTime}
                      </li>
                    ))}
                  </ul> */}
                </li>
              ))}
             </ul>}
          </div>
  )
}
