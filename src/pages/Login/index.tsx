import './style.scss'

export function Login() {
    return (
        <div className='container'>
            <h1>Login</h1>
            <form className='form-container'>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder='Example@email.com' />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder='Pelo menos 8 caracteres' />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}