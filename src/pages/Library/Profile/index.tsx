import { FaRegCircleUser } from 'react-icons/fa6'
import exLivro from '../../../assets/exLivro.jpg'
import './style.scss'
import { FaPlayCircle } from 'react-icons/fa'

export function Profile() {
    return (
        <div className="Profile-container">
            <div className="profile-banner"></div>
            <header className='profile-header'>
                <div className='profile-header-user'>
                    <div className="profile-user">
                        <FaRegCircleUser size={100} />
                    </div>
                    <h1>@rebeca</h1>
                </div>

                <div className="profile-header-button">
                    <button>Editar Perfil</button>
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
                        <div className='cont'>
                            <p>Nome:</p>
                            <input type="text" id="name" value="Nome" />
                            <button type='submit' className="btn-yellow btn-deletar">Deletar</button>
                        </div>
                    </li>
                    <li>
                        <input type='radio' name='data' id='second' className="toggle-button" value="Mudar nome" />
                        <label className='profile-label' htmlFor="second">Mudar senha</label>
                        <div className='cont' id='profile-password'>
                            <div>
                                <p>Nome:</p>
                                <input type="password" id="password" />
                            </div>
                            <div>
                                <p>Confirmar senha:</p>
                                <input type="password" id="confirm-password" />
                            </div>
                            <button type='submit' className="btn-yellow btn-deletar">Deletar</button>

                        </div>
                    </li>
                </ul >
            </section>
        </div >
    )
}