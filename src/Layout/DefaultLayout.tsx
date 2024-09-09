import { Outlet, useNavigate } from "react-router-dom";
import { api } from '../lib/axios'
import { useCallback, useContext, useEffect } from "react";
import './style.scss'
import { UserContext } from "../context/UserContext.tsx";
import { ModalMessage } from "../components/ModalMessage/index.tsx";
import { AxiosError } from "axios";

export function DefaultLayout() {
    const navigate = useNavigate()
    const { getUser } = useContext(UserContext)

    const verifyAuthUser = useCallback(async () => {
        try {
            const token = localStorage.getItem('token');
            await api.get('/checkauth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            await getUser()

        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                localStorage.clear()
                navigate('/')
                return
            }
            console.log(err)
        }
    }, [])

    useEffect(() => {
        verifyAuthUser()

    }, [verifyAuthUser])

    
    return (
        <div className="layout-container">
            <Outlet />
            <ModalMessage />
        </div>
    )
}