import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { api } from '../lib/axios';
import { UserContext } from "../context/UserContext/index.tsx";
import { AxiosError } from "axios";
import './style.scss'
import { TooltipContext } from "../context/TooltipContext/index.tsx";

export function GlobalLayout() {

    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)

    const navigate = useNavigate()
    const { getUser } = useContext(UserContext)

    useEffect(() => {
        async function verifyAuthUser() {
            try {
                await api.get('/checkauth')
                await getUser()
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    TextTooltip(err.response.data.message)
                    ShowTooltip(true)
                    ErrorTooltip(err.response.data.error)
                    localStorage.clear()
                    navigate('/')
                    return
                }
                
            }
        }

        verifyAuthUser()
    }, [])

    return (
        <div className="globak-layout">
            <Outlet />
        </div>
    )
}