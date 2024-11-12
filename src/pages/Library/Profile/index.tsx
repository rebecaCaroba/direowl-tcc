import { FaRegCircleUser } from 'react-icons/fa6'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../context/UserContext/index.tsx'
import { FormUsename } from '../../../components/FormUsername/index.tsx'
import { FormPassword } from '../../../components/FormPassword/index.tsx'
import { useNavigate } from 'react-router-dom'
import { api } from '../../../lib/axios/index.ts'
import './style.scss'
import { DeleteCatalog } from '../../../components/DeleteCatalog/index.tsx'
import { Readings } from '../../../components/Readings/index.tsx'
import { DeleteAccount } from '../../../components/DeleteAccount/index.tsx'

interface BookReadType {
    schedule_id: number,
    user_id: number,
    created_at: Date,
    book_id: number,
    book_title: string,
    imageLinks: string
    complete: boolean
}

export function Profile() {
    const { user, logout } = useContext(UserContext)
    const [bookRead, setBookRead] = useState<BookReadType[]>([])
    const navigate = useNavigate()

    function handleLogout() {
        logout()
        navigate('/')

    }

    useEffect(() => {
        async function getAllSchedule() {
            try {
                const response = await api.get('/get-all-schedule')

                setBookRead(response.data.result)

            } catch (err) {
                console.log(err)
            }
        }

        getAllSchedule()
    }, [])



    return (
        <div className="Profile-container">
            <div className="profile-banner"></div>
            <header className='profile-header'>
                <div className='profile-header-user'>
                    <div className="profile-user">
                        <FaRegCircleUser size={100} />
                    </div>
                    <h1>@{user?.name}</h1>
                </div>

                <div className="profile-header-button">
                    <button onClick={() => handleLogout()} >Sair</button>
                </div>
            </header>



            <section className='leituras'>
                <div className="title">
                    <h1>Leituras</h1>
                </div>
                <Readings bookRead={bookRead} />
            </section>
            <section className="profile-dados-gerais">
                <div className="title">
                    <h1>Dados Gerais</h1>
                </div>
                <ul>
                    <li>
                        <input type='radio' name='data' id='first' className="toggle-button" value="Mudar nome" />
                        <label className='profile-label' htmlFor="first">Mudar nome</label>
                        <FormUsename user={user} />
                    </li>
                    <li>
                        <input type='radio' name='data' id='second' className="toggle-button" value="Mudar nome" />
                        <label className='profile-label' htmlFor="second">Mudar senha</label>
                        <FormPassword />
                    </li>
                    <li>
                        <input type='radio' name='data' id='third' className="toggle-button" value="Mudar nome" />
                        <label className='profile-label' htmlFor="third">Deletar catálogo</label>
                        <DeleteCatalog />
                    </li>
                    <li>
                        <input type='radio' name='data' id='fourth' className="toggle-button" value="Mudar nome" />
                        <label className='profile-label' htmlFor="fourth">Deletar conta</label>
                        <DeleteAccount user={user} />
                    </li>
                </ul >
            </section>
        </div >
    )
}