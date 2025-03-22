import useReserveSlot from '../../Hooks/Slots/useReserveSlot.jsx'
import useOpen from '../../Hooks/useOpen.jsx'

export default function ReserveSlot({turno, serviceId}) {
    
    const {open, handlerOpen} = useOpen()
    const {responseError, loader, handlerSubmit} = useReserveSlot({turno, serviceId})

  return (<>
        <button onClick={handlerOpen}>Turno: {turno.turno}</button>
        {
            open && <form onSubmit={handlerSubmit}>
                <input type="text" name="nombre" id="nombre" placeholder='ingrese su nombre completo' />
                <input type="text" name="dni" id="dni" placeholder='ingrese su DNI'/>
                <input type="number" name="edad" id="edad" placeholder='ingrese su edad'/>
                <input type="email" name="email" id="email" placeholder='ingrese su email'/>
                <input type="number" name="telefono" id="telefono" placeholder='ingrese su telefono'/>

                <button>{loader ? 'Redirigiendo...' : 'Reservar'}</button>
                {responseError.status && <span>{responseError.message}</span>}
            </form>
        }
     </>

  )
}
