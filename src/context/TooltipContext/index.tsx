import { createContext, ReactNode, useState } from "react"

interface TooltipProviderProps {
    children: ReactNode
}

interface TooltipContextType {
    textTooltip: string | undefined
    isShowTooltip: boolean
    TextTooltip: (message: string | undefined) => void
    ShowTooltip: (isTooltip: boolean) => void
    ErrorTooltip: (erro: boolean | undefined) => void
    isErrorTooltip: boolean | undefined
}

export const TooltipContext = createContext({} as TooltipContextType)

export function TooltipProvider({children}: TooltipProviderProps) {
    const [ textTooltip, setTextTooltip ] = useState<string | undefined>(undefined)
    const [ isShowTooltip, setIsShowTooltip ] = useState<boolean>(false)
    const [ isErrorTooltip, setIsErrorTooltip ] = useState<boolean | undefined>(false)

    function ErrorTooltip(error: boolean | undefined) {
        setIsErrorTooltip(error)
    }

    function TextTooltip(message: string | undefined) {
        setTextTooltip(message)
    }

    function ShowTooltip(show: boolean) {
        setIsShowTooltip(show)
    }

    return (
        <TooltipContext.Provider value={{
            textTooltip,
            isShowTooltip,
            isErrorTooltip,
            TextTooltip,
            ShowTooltip,
            ErrorTooltip
        }}>
            {children}
        </TooltipContext.Provider>
    )
}