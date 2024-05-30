import './style.scss'

export function AddCatalog() {
    return (
        <>
            <div className="addcatolog-container">
                <h1>Criar catálogo</h1>
                <div className="addcatalog-content">
                    <form>
                        <label htmlFor="addCatalog">Nome do catálogo</label>
                        <input type="text" max={40} name="addCatalog" id="addCatalog" placeholder='Meus livros, Romance, Comédia, Desejos...' />
                        <span>Limite de 50 caracteres</span>
                        <button type="submit">Criar</button>
                    </form>
                </div>
            </div>
        </>
    )
}