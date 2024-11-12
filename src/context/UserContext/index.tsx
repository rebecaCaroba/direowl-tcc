import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
import { api } from "../../lib/axios"
import { AxiosError } from "axios"

interface UserContextProviderProps {
    children: ReactNode
}

interface User {
    name: string
    email: string
}

interface UserContextType {
    user: User | null
    getUser: () => Promise<void>
    logout: () => void
    setUser: Dispatch<SetStateAction<User | null>>
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    async function getUser() {
            try {
                const response = await api.get('/get-user')

                setUser(response.data.user)
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    alert(err.response.data.message)
                    return
                }
                
            }
        }

    function logout() {
        localStorage.clear()
        setUser(null)
    }

    return (
        <UserContext.Provider value={{
            user,
            getUser,
            logout,
            setUser,
        }} >
            {children}
        </UserContext.Provider>
    )
}