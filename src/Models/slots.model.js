import axios from "axios";
import { createOrderSlotRoute, slotsByProfessionalRoute } from "../Routes/slots.routes";


export class SlotsModel {
    static async getAllSlotsByProfessional(id){
        try {
            const allSlots = await axios.get(slotsByProfessionalRoute(id))
            return allSlots.data
        } catch (error) {
            console.error(error)
        }
    }

    static async CreateOrder (turno_Id, turnoData){
        try{
            const url = await axios.post(createOrderSlotRoute(turno_Id), turnoData)
            return url.data
        }catch(error){
            console.error('Error by model', error)
        }
    }
}