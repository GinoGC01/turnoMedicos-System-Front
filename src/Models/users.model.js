import axios from "axios";
import { allUsersRoute } from "../Routes/users.routes";

export class UsersModel {
    static async getUsers(){
        try {
            const allUsers = await axios.get(allUsersRoute())
            return allUsers
        } catch (error) {
            console.error(error)
        }
    }
}