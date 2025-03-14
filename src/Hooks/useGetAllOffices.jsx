import { useState, useEffect } from 'react'
import { OfficeController } from '../Controllers/ofice.controller.js'

export function useGetAllOffices() {
    const [offices, setOffices] = useState({})

    const GetAllOffices = async () => {
        try {
            const allOffices = await OfficeController.GetAllOffices()
            // console.log('Hook>>>>>>>>>>>>>>>>>>>>', allOffices)
            setOffices(allOffices)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        GetAllOffices()
    }, [])
        
      return {offices}
}
