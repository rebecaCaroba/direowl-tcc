import { useContext } from "react"
import { ModalMessageContext } from "../../context/ModalMessageContext"
import { IoMdClose } from "react-icons/io";

import './style.scss'

export function ModalMessage() {
    const { textModalMessage, isShowModalMessage, ShowModalMessage, isErrorModalMessage, ErrorModalMessage } = useContext(ModalMessageContext)

    if(isShowModalMessage || isErrorModalMessage) {
        setTimeout(() => {
            ShowModalMessage(false)
            ErrorModalMessage(false)
        }, 5000)
    }

    //tooltip
    return (
        <div className={`ModalMessage ${isShowModalMessage ? 'showModal' : ''} ${isErrorModalMessage ? 'showModalError' : ''}`}>
            <span>{ textModalMessage }</span>
            <button onClick={() => ShowModalMessage(false)}><IoMdClose size={24} /></button>
        </div>
    )
}