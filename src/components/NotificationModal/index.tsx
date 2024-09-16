import { useContext } from "react"
import { NotificationModalContext } from '../../context/NotificationModalContext'
import './style.scss'

export function NotificationModal() {
    const { confirmAction, isModal, message, closeConfirmModal } = useContext(NotificationModalContext)

    return (
        <>
            {isModal &&
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{message}</p>
                        <section>
                            <button className="modal-cancel" onClick={closeConfirmModal}>Cancelar</button>
                            <button className="modal-confirm" onClick={confirmAction}>Confirmar</button>
                        </section>
                    </div>
                </div>
            }
        </>
    )
}