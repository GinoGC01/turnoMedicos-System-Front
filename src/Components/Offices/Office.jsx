import React, { useState } from 'react'
import { useGetOfice } from '../../Hooks/useGetOfice'

export default function Office({officeWhitProfessionals}) {
    const [open, setOpen] = useState(false)

    const {office} = useGetOfice({id:officeWhitProfessionals._id})
    const handlerOpen =  ()=>{
        setOpen(!open)
    }

  return (<>
    <li ><button onClick={handlerOpen}>{officeWhitProfessionals.name}</button></li>
    {open && <ul>
        {office.consultorio.professionals?.map((professional)=>{
            console.log(professional)
            return <li key={professional._id}>
               <strong> {professional.name}</strong>
               <ul>
                {professional.services?.map((service)=>{
                    return <li key={service.id}>{service.title}</li>
                })}
               </ul>
            </li>
        })}
    </ul>}
    
  </>
  )
}
