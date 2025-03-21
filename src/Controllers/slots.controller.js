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

    static async CreateOrder(turno_Id, turnoData){
        try {
            if(objectIdRegex.test(turno_Id)){
                const url = await SlotsModel.CreateOrder(turno_Id, turnoData)
                return url
            }
        } catch (error) {
            console.error('Error by controller', error)

        }
    }
}