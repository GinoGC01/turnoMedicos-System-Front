import { objectIdRegex } from "../Schemas/idMongoSchema"
import { SlotsModel } from "../Models/slots.model"

export class SlotsController{
    static async GetSlotsByProfessional(id) {
        try {
            if(objectIdRegex.test(id)){
                const getSlots = await SlotsModel.getAllSlotsByProfessional(id)
                return getSlots
            }
            else{
                throw new Error({message: 'id no compatible', id})
            }
        } catch (error) {
            console.error(error)
        }
    }
}