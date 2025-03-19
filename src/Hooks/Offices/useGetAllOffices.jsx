import { useState, useEffect } from 'react'
import { OfficeController } from '../../Controllers/office.controller.js'

export function useGetAllOffices() {
    const [offices, setOffices] = useState({})

    const GetAllOffices = async () => {
        try {
            const allOffices = await OfficeController.GetAllOffices()
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
