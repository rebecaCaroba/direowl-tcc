import { createContext, ReactNode, useState } from "react"

interface NotificationModalProps {
    children: ReactNode
}

interface NotificationModalContextType {
    message: string | undefined 
    isModal: boolean
    messageModal: (message: string | undefined) => void
    showModal: (confirmAction: () => Promise<void>) => void;
    confirmAction: () => void
    closeConfirmModal: () => void
}

export const NotificationModalContext = createContext({} as NotificationModalContextType)

export function NotificationModalProvider({children}: NotificationModalProps) {
    const [ message, setMessage ] = useState<string | undefined>('')
    const [ isModal, setIsModal ] = useState<boolean>(false)
    const [ onConfirm, setOnConfirm] = useState<(() => Promise<void>) | null>(null)

    function messageModal(message: string | undefined) {
        setMessage(message)
    }

    function showModal(confirmAction: () => Promise<void>) {
        setOnConfirm(() => confirmAction)
        setIsModal(true)
    }

    function closeConfirmModal() {
        setIsModal(false)
    }

    function confirmAction() {
        if (onConfirm) {
            onConfirm()
          }
        closeConfirmModal()
    }

    return (
        <NotificationModalContext.Provider value={{
            messageModal,
            isModal,
            message,
            showModal,
            confirmAction,
            closeConfirmModal,
        }}>
            {children}
        </NotificationModalContext.Provider>
    )
}