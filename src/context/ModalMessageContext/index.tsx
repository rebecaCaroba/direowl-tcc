import { createContext, ReactNode, useState } from "react"

interface ModalMessageProviderProps {
    children: ReactNode
}

interface ModalMessageContextType {
    textModalMessage: string | undefined
    isShowModalMessage: boolean
    TextModalMessage: (message: string | undefined) => void
    ShowModalMessage: (isModalMessage: boolean) => void
    ErrorModalMessage: (erro: boolean | undefined) => void
    isErrorModalMessage: boolean | undefined
}

export const ModalMessageContext = createContext({} as ModalMessageContextType)

export function ModalMessageProvider({children}: ModalMessageProviderProps) {
    const [ textModalMessage, setTextModalMessage ] = useState<string | undefined>(undefined)
    const [ isShowModalMessage, setIsShowModalMessage ] = useState<boolean>(false)
    const [ isErrorModalMessage, setIsErrorModalMessage ] = useState<boolean | undefined>(false)

    function ErrorModalMessage(error: boolean | undefined) {
        setIsErrorModalMessage(error)
    }

    function TextModalMessage(message: string | undefined) {
        setTextModalMessage(message)
    }

    function ShowModalMessage(show: boolean) {
        setIsShowModalMessage(show)
    }

    return (
        <ModalMessageContext.Provider value={{
            textModalMessage,
            isShowModalMessage,
            isErrorModalMessage,
            TextModalMessage,
            ShowModalMessage,
            ErrorModalMessage
        }}>
            {children}
        </ModalMessageContext.Provider>
    )
}