import axios from "axios";
import { allProfessionalsRoute } from "../Routes/professionals.routes";
export class ProfessionalsModel {
    static async getAllProfesionals(){
        try {
            const allProfessionals = axios.get(allProfessionalsRoute())
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