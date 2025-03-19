import { useEffect, useState, useCallback } from "react";
import { OfficeController } from "../../Controllers/office.controller";


export function useGetOfice({id}) {
    const [office, setOffice]= useState({})

      // Obtener los slots del profesional
      const getOffice = useCallback(async () => {
        try {
            const office = await OfficeController.GetOffice(id)
            setOffice(office.data)
        } catch (error) {
          console.error(error);
        }
      }, [id]);

    useEffect(()=>{
        getOffice()
    }, [getOffice])

  return {office}
}


