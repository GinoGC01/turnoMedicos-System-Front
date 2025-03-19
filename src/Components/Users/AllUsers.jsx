import { useAllUsers } from "../../Hooks/Users/useAllUsers.jsx"

export function AllUsers() {

    const {users} = useAllUsers()

    return <>
    {users.result?.map((user)=>{
        return <li key={user._id}>{user.nombre}</li>
    })}
    </>
}