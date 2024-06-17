import './style.scss'

export function AddCatalog() {
    return (
        <>
            <div className="addcatolog-container">
                <h1 className='text-yelow'>Criar catálogo</h1>
                <div className="addcatalog-content">
                    <form>
                        <label htmlFor="addCatalog">Nome do catálogo</label>
                        <input type="text" max={40} name="addCatalog" id="addCatalog" placeholder='Meus livros, Romance, Comédia, Desejos...' />
                        <span>Limite de 50 caracteres</span>
                        <button className='btn-yellow' type="submit">Criar</button>
                    </form>
                </div>
            </div>
        </>
    )
}