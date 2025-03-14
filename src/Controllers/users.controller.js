import { UsersModel } from "../Models/users.model.js";
export class UsersController{
    static async AllUsers() {
        const allUsers = await UsersModel.getUsers()
        return allUsers.data
    }
}