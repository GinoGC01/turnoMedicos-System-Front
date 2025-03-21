import { useGetOfice } from '../../Hooks/Offices/useGetOfice.jsx'
import Professional from './Professional.jsx'
import useOpen from '../../Hooks/useOpen.jsx'

export default function Office({officeWhitProfessionals}) {

    const {office} = useGetOfice({id:officeWhitProfessionals._id})
    const {open, handlerOpen} = useOpen()


  return (
    <li>
      <button onClick={handlerOpen}>{officeWhitProfessionals.name}</button>
      {open && <ul>
        {office.consultorio.professionals?.map((professional)=>{
                return <Professional professional={professional} key={professional._id}/>
        })}
    </ul>}
    </li>
    
  )
}
