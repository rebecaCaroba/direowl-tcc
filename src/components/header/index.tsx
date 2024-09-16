import { Aside } from "../Aside";
import { RiMenuUnfold3Line } from "react-icons/ri";
import './style.scss'
import logobranca from '../../assets/logobranca.svg'

export function Header() {
    function toggleIsShowNavbar() {
        const element = document.querySelector('#aside') as HTMLElement

        element.classList.toggle('active')
    }

    return (
        <header className="Header">
            <div className="header-sidebar-logo">
            <img src={logobranca} width={45} alt="logo-direowl" />
            <button className="show-navbar" onClick={() => toggleIsShowNavbar()}><RiMenuUnfold3Line size={42} /></button>
            </div>
            <Aside />
        </header>
    )
}