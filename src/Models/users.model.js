import axios from "axios";

export class UsersModel {
    static async getUsers(){
        try {
            const allUsers = await axios.get('http://localhost:3000/api/get-allUsers')
            return allUsers
        } catch (error) {
            console.error(error)
        }
    }
}