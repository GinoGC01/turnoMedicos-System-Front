import React from 'react'
import Office from './Office.jsx'

import { useGetAllOffices } from '../../Hooks/Offices/useGetAllOffices.jsx'

export function Offices() {
  const {offices} = useGetAllOffices()

  return (
    <ul>{
      offices.consultorios?.map((office)=>{
        return <Office key={office._id} officeWhitProfessionals={office}/>
      })
    }</ul>
  )
}
