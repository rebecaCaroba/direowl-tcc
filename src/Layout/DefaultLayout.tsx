import { Outlet } from "react-router-dom";
import './style.scss'
// import { AxiosError } from "axios";
// import { api } from '../lib/axios'
// import { useEffect } from "react";

export function DefaultLayout() {
    // const navigate = useNavigate();

    // async function verifyAuthUser() {
    //     try {
    //         const token = localStorage.getItem('token');
    //         await api.get('/checkauth', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });

    //     } catch (err) {
    //         if (err instanceof AxiosError && err?.response?.data?.message) {
    //             alert(err.response.data.message)
    //             navigate('/')
    //             return
    //         }
    //         console.log(err)
    //     }
    // }

    // useEffect(() => {
    //     verifyAuthUser()
    // }, [])

    return (
        <div className="layout-container">
            <Outlet />
        </div>
    )
}