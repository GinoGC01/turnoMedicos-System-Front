import React from 'react'
import useOpen from '../../Hooks/useOpen.jsx';
import ReserveSlot from './ReserveSlot.jsx';


export default function SlotsByServices({fecha, turnos, serviceId}) {
    const {open, handlerOpen} = useOpen()
  return (
        <div>
             <button onClick={handlerOpen}>Fecha: {fecha}</button>
            {open && <ul>
              {turnos.map((turno, turnoIndex) => (
                <li key={turnoIndex}>
                  <ReserveSlot turno={turno} serviceId={serviceId} key={turno._id}/>
                </li>
              ))}
             </ul>}
          </div>
  )
}
