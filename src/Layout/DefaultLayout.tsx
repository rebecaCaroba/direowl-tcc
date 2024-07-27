import { Outlet, useNavigate } from "react-router-dom";
import { api } from '../lib/axios'
import { useEffect } from "react";
import './style.scss'

export function DefaultLayout() {
    const navigate = useNavigate();

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
    }, [])

    return (
        <div className="layout-container">
            <Outlet />
        </div>
    )
}