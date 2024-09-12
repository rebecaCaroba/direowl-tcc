import { useContext } from "react"
import { TooltipContext } from "../../context/TooltipContext"
import { IoMdClose } from "react-icons/io";

import './style.scss'

export function Tooltip() {
    const { textTooltip, isShowTooltip, ShowTooltip, isErrorTooltip, ErrorTooltip } = useContext(TooltipContext)

    if(isShowTooltip || isErrorTooltip) {
        setTimeout(() => {
            ShowTooltip(false)
            ErrorTooltip(false)
        }, 5000)
    }

    //tooltip
    return (
        <div className={`Tooltip ${isShowTooltip ? 'showModal' : ''} ${isErrorTooltip ? 'showModalError' : ''}`}>
            <span>{ textTooltip }</span>
            <button onClick={() => ShowTooltip(false)}><IoMdClose size={24} /></button>
        </div>
    )
}