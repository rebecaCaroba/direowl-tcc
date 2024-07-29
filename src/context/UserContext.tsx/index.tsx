import { createContext, ReactNode, useState } from "react"
import { api } from "../../lib/axios"
import { AxiosError } from "axios"

interface UserContextProviderProps {
    children: ReactNode
}

interface User {
    id: number
    name: string
    email: string
}

interface UserContextType {
    user: User | null
    getUser: () => Promise<void>
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    async function getUser() {
            try {
                const token = localStorage.getItem('token')
                const response = await api.get('/get-user', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setUser(response.data.user)
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    alert(err.response.data.message)
                    return
                }
                console.log(err)
            }
        }

    return (
        <UserContext.Provider value={{
            user,
            getUser
        }} >
            {children}
        </UserContext.Provider>
    )
}