import './style.scss'

export function Login() {
    return (
        <div className='container'>
            <form className='form-container'>
                <h1>Login</h1>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder='Example@email.com' />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder='Pelo menos 8 caracteres' />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}