import React from 'react'
import useSlotsByProfessional from '../../Hooks/Slots/useSlotsByProfessional.jsx';
import { dateFormater } from '../../utils/dateFormater.js';
import SlotsByServices from '../Slots/SlotsByServices.jsx';
import useOpen from '../../Hooks/useOpen.jsx';
export default function Professional({professional}) {
    const { slotsByServices } = useSlotsByProfessional({
        id: professional._id,
        services: professional.services,
      });
    const {open, handlerOpen} = useOpen()

  return (
    <div>
      <h3>{professional.name}</h3>
      <button onClick={handlerOpen}>ver servicios</button>
      {open && <ul>
        {slotsByServices.map((service, index) => (
          <li key={index}>
            <h2>{service.title}</h2>
            <p>Duración: {service.duration} minutos</p>
            {Object.entries(service.turnosPorDia).map(([date, turnos]) => { 
              const fecha = dateFormater(date)
              return <SlotsByServices key={date} fecha={fecha} turnos={turnos} serviceId={service.id}/>
            })}
          </li>
        ))}
      </ul>}
    </div>
  )
}
