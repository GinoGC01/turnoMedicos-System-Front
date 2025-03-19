import axios from "axios";
import { allOfficesRoute, officePopulateProfessionalRoute } from "../Routes/offices.routes.js";
export class OfficesModel {

    static async getAllOffices(){
        try {
            const allOffices = await axios.get(allOfficesRoute())
            return allOffices
        } catch (error) {
            console.error(error)
        }
    }

    static async getOffice(id){
        try {
            const officePopulateProfessional = await axios.get(officePopulateProfessionalRoute(id))
            return officePopulateProfessional
        } catch (error) {
            console.error(error)
            
        }
    }
}