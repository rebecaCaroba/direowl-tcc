import { FaRegCircleUser } from 'react-icons/fa6'
import exLivro from '../../../assets/exLivro.jpg'
import './style.scss'
import { FaPlayCircle } from 'react-icons/fa'
import { useContext } from 'react'
import { UserContext } from '../../../context/UserContext.tsx'
import { FormUsename } from '../../../components/FormUsername/index.tsx'
import { FormPassword } from '../../../components/FormPassword/index.tsx'

export function Profile() {
    const { user } = useContext(UserContext)

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
                    <button>Sair</button>
                </div>
            </header>

            <section className="profile-leituras-em-andamento">
                <div className="title">
                    <h1>Leituras em andamento</h1>
                    <div className="profile-leituras-container">
                        <div className="profile-leituras-info">
                            <img src={exLivro} alt="" />
                            <div>
                                <h2>Diário de um banana</h2>
                                <p>Em andamento</p>
                            </div>
                        </div>
                        <button className='button-timer'>
                            <FaPlayCircle />
                        </button>
                    </div>
                </div>
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
                </ul >
            </section>
        </div >
    )
}