import axios from "axios";
export class OfficesModel {

    static async getAllOffices(){
        try {
            const allOffices = await axios.get('http://localhost:3000/api/get-consultorios')
            // console.log('Model >>>>>>>>>>>>>>>>', allOffices)
            return allOffices
        } catch (error) {
            console.error(error)
        }
    }

    static async getOffice(id){
        try {
            const officePopulateProfessional = await axios.get(`http://localhost:3000/api/get-professionalsByConsultorios/${id}`)
            return officePopulateProfessional
        } catch (error) {
            console.error(error)
            
        }
    }
}