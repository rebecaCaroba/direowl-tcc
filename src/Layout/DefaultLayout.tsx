import { Outlet, useNavigate } from "react-router-dom";
import { api } from '../lib/axios'
import { useContext, useEffect } from "react";
import './style.scss'
import { UserContext } from "../context/UserContext.tsx";
import { ModalMessage } from "../components/ModalMessage/index.tsx";

export function DefaultLayout() {
    const navigate = useNavigate()
    const { getUser } = useContext(UserContext)

    async function verifyAuthUser() {
        try {
            const token = localStorage.getItem('token');
            await api.get('/checkauth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (err) {
            alert(err)
            localStorage.clear()
            navigate('/')
            return
        }
    }

    useEffect(() => {
        verifyAuthUser()
        getUser()
    }, [])

    return (
        <div className="layout-container">
            <Outlet />
            <ModalMessage />
        </div>
    )
}