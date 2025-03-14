import { useEffect, useState } from "react";
import { OfficeController } from "../Controllers/ofice.controller";


export function useGetOfice({id}) {
    const [office, setOffice]= useState({})
    const getOffice = async () => {
        try {
            const office = await OfficeController.GetOffice(id)
            setOffice(office.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getOffice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

  return {office}
}


