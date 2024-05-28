import { Outlet } from "react-router-dom";
import './style.scss'

export function DefaultLayout() {
    return (
        <div className="layout-container">
            <Outlet/>
        </div>
    )
}