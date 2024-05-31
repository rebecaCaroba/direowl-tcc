import { Link } from "react-router-dom";
import { Aside } from "../Aside";
import { RiMenuUnfold3Line } from "react-icons/ri";
import './style.scss'
import { FaBook } from "react-icons/fa";

export function Header() {
    function toggleIsShowNavbar() {
        console.log('oi')
        const element = document.querySelector('#aside') as HTMLElement

        element.classList.toggle('active')
    }

    return (
        <header className="Header">
            <div className="header-sidebar-logo">
            <Link to="/library"><FaBook color="white" size={52} /></Link>
            </div>
            <button className="show-navbar" onClick={() => toggleIsShowNavbar()}><RiMenuUnfold3Line size={42} /></button>
            <Aside />
        </header>
    )
}