import axios from "axios";
export class ProfessionalsModel {
    static async getAllProfesionals(){
        try {
            const allProfessionals = axios.get('http://localhost:3000/api/get-allUsers')
            const result = await allProfessionals
            return result
        } catch (error) {
            console.error(error)
        }
    }

    static async getProfessional(){
        //To do
    }
}