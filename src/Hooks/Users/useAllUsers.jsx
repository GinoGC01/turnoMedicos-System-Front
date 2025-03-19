import { useEffect, useState } from "react";
import { UsersController } from "../../Controllers/users.controller";

export function useAllUsers (){
    const [users, setUsers] = useState({})

    async function getUsers (){
        const allUsers = await UsersController.AllUsers()
        setUsers(allUsers)
    }

    useEffect(()=>{
        getUsers()
    }, [])
    

    return {users} //return object
}