import { OfficesModel } from "../Models/ofice.model.js"
import { objectIdRegex } from "../Schemas/idMongoSchema.js"

export class OfficeController{
    static async GetOffice(id) {
        try {
            if(objectIdRegex.test(id)){
                const getOfice = await OfficesModel.getOffice(id)
                return getOfice
            }
            else{
                throw new Error({message: 'id no compatible', id})
            }
        } catch (error) {
            console.error(error)
        }
        
    }

    static async GetAllOffices() {
        try {
            const allOffices = await OfficesModel.getAllOffices()
            // console.log('controller >>>>>>>>>>>>>>>>', allOffices)
            return allOffices.data
        } catch (error) {
            console.error(error)
        }

    }
}