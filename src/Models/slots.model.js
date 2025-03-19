import axios from "axios";
import { slotsByProfessionalRoute } from "../Routes/slots.routes";


export class SlotsModel {
    static async getAllSlotsByProfessional(id){
        try {
            const allSlots = await axios.get(slotsByProfessionalRoute(id))
            return allSlots.data
        } catch (error) {
            console.error(error)
        }
    }
}