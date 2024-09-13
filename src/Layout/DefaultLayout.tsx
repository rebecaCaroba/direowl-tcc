import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from '../lib/axios';
import { UserContext } from "../context/UserContext.tsx";
import { Tooltip } from '../components/Tooltip/index.tsx';
import { AxiosError } from "axios";
import './style.scss'
import { NotificationModal } from "../components/NotificationModal/index.tsx";

export function DefaultLayout() {
    const navigate = useNavigate()
    const { getUser } = useContext(UserContext)

    useEffect(() => {
        async function verifyAuthUser() {
            try {
                const token = localStorage.getItem('token');
                await api.get('/checkauth', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                await getUser();
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    alert(err.response.data.message)
                    localStorage.clear()
                    navigate('/')
                    return
                }
                console.log(err)
            }
        }

        verifyAuthUser()
    }, [])

    return (
        <div className="layout-container">
            <Outlet />
            <Tooltip />
            <NotificationModal />
        </div>
    )
}