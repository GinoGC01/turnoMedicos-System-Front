import { useState } from 'react'
import { SlotsController } from '../../Controllers/slots.controller.js'
import { formValidation } from '../../Validations/formCreateOrder.js'

export default function useReserveSlot({turno, serviceId}) {
    const [responseError, setResponseError] = useState({status:false, message:""})
    const [loader, setLoader] = useState(false)

    const handlerSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const fields = Object.fromEntries(formData);
        const {nombre, dni, edad, email, telefono} = fields
        const dataOfForm = {
            nombre, dni, edad, email, telefono, servicioId:serviceId
        }

        const validation = formValidation(dataOfForm)

        if(!validation.status){
            setResponseError({status:true, message:validation.message})
            return
        }

        try{
            const turno_Id = turno.grupoTurnos[0]._id
            const response = await SlotsController.CreateOrder(turno_Id, dataOfForm)
            setLoader(true)
            setResponseError({status:false, message:""})
            validation.status && window.location.replace(response.urlFront);    
        }
        catch(error){
            console.error('error by component', error)
        }
    }

    return {
        responseError, loader, handlerSubmit
    }
}
