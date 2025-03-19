import React, { useState } from 'react'
import useOpen from '../../Hooks/useOpen.jsx'
import useSlotsByProfessional from '../../Hooks/Slots/useSlotsByProfessional.jsx'

export default function Service({service, professionalId}) {
    const [turnos, setTurnos] = useState([])
    const {slots} = useSlotsByProfessional({id:professionalId})

    const {open, handlerOpen} = useOpen()
    const handlerButton = () => {
        handlerOpen()
    }

  return (
    <li>{service.title}
    <button onClick={handlerButton}>Consultar turnos</button>
    {open && <ul>

    </ul>}
    </li>
  )
}
