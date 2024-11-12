import { Outlet } from "react-router-dom";
import { Tooltip } from '../components/Tooltip/index.tsx';
import { NotificationModal } from "../components/NotificationModal/index.tsx";
import './style.scss'

export function DefaultLayout() {

    return (
        <div className="layout-container">
            <Outlet />
            <Tooltip />
            <NotificationModal />
        </div>
    )
}