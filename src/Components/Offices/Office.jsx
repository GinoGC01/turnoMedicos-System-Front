import React, { useState } from 'react'
import { useGetOfice } from '../../Hooks/Offices/useGetOfice.jsx'
import Professional from './Professional.jsx'

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
            return <Professional professional={professional} key={professional._id}/>
        })}
    </ul>}
    
  </>
  )
}
