import { createContext, ReactNode, useState } from "react"

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
    setUser: (user: User | null) => void
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProviderProps) {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{
            user,
            setUser
        }} >
            {children}
        </UserContext.Provider>
    )
}