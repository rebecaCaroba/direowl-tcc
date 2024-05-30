import { Link } from "react-router-dom";
import './style.scss'
import { IoSearch } from "react-icons/io5";

export function AddBook() {
    return (
        <>
            <div className="addbook-container">
            <h1>Adicionar livro</h1>
                <div className="addbook-content">
                    <nav>
                        <ul>
                            <li>
                                <Link to="">Pesquisa</Link>
                            </li>
                            <li>
                                <Link to="">Manual</Link>
                            </li>
                        </ul>
                    </nav>
                    <section>
                        <form className="addbook-form">
                            <label htmlFor="catalog">Selecione o catálogo</label>
                            <select name="catalog" id="">
                                <option value="Guerra">Guerra</option>
                                <option value="Romance">Romance</option>
                            </select>

                            <label htmlFor="searchbook">Pesquise o livro</label>
                            <div className="search-book">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    name="searchbook"
                                    id="searchbook"
                                    placeholder="Pesquise por nome, autor, ISBN"
                                />

                                <IoSearch size={32} />
                            </div>

                            <button type="submit">Pesquisar</button>
                        </form>
                    </section>
                </div>
            </div>
        </>
    )
}