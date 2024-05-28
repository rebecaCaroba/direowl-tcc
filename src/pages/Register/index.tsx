export function Register() {
    return (
        <div className='container'>
            <form className="form-container">
                <h1>Cadastro</h1>
                <label htmlFor="username">Nome</label>
                <input type="text" name="username" id="username" placeholder='John' />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" placeholder='Example@email.com' />
                <label htmlFor="password">Senha</label>
                <input type="password" id="password" placeholder='Pelo menos 8 caracteres' />
                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input type="password" id="confirmPassword" placeholder='Confirmar senha' />
                <button type="submit">Entrar</button>
            </form>
        </div>
    )
}