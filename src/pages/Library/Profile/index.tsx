import './style.scss'


export function Profile() {
    return (
        <div className="Profile-container">
            <h1 className='text-yellow'>Dados Gerais</h1>

            <div className="profile-data">
                <ul>
                    <li>
                        <input type='radio' name='data' id='first' className="toggle-button" value="Mudar nome" />
                        <label htmlFor="first">Mudar nome</label>
                        <div className='cont'>
                            <p>Nome:</p>
                            <input type="text" id="name" value="Nome" />
                            <button type='submit' className="btn-yellow">Deletar</button>
                        </div>
                    </li>
                    <li>
                        <input type='radio' name='data' id='second' className="toggle-button" value="Mudar nome" />
                        <label htmlFor="second">Mudar senha</label>
                        <div className='cont' id='profile-password'>
                            <div>
                                <p>Nome:</p>
                                <input type="password" id="password" />
                            </div>
                            <div>
                                <p>Confirmar senha:</p>
                                <input type="password" id="confirm-password" />
                            </div>
                            <button type='submit' className="btn-yellow">Deletar</button>

                        </div>
                    </li>
                </ul >
            </div >

            {/* <div className="Profile-content">
                <input type='button' className="toggle-button" value="Mudar nome" />
                <div>
                    <label htmlFor="name">Nome:</label>
                    <input type="text" id="name" value="Nome" />
                    <button type='submit' className="btn-yellow">Deletar</button>
                </div>
            </div>

            <div className="Profile-content">
                <input type='button' className="toggle-button" value="Mudar senha" />
                <div className='profile-passwords'>
                    <div>
                        <label htmlFor="password">Senha:</label>
                        <input type="password" id="password" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirmar senha:</label>
                        <input type="password" id="confirm-password" />
                    </div>
                    <button type='submit' className="btn-yellow">Deletar</button>
                </div>
            </div> */}

        </div >

    )
}