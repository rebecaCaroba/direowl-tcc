import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import sherlock from '../../../assets/sherlock.jpg'
import './style.scss'

export function AddBook() {
    return (
        <>
            <div className="addbook-container">
            <h1 className="text-yelow">Adicionar livro</h1>
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

                            <button className="btn-yellow" type="submit">Pesquisar</button>
                        </form>
                    </section>
                </div>
                <div className="book-search">
                    <h1>Resultados</h1>

                    <section>
                        <div className="image">
                            <img src={sherlock} alt="" />
                            <button className="btn-yellow">Adicionar</button>
                        </div>
                        <div className="info">
                            <h2>Sherlock - O retorno de Sherlock Holmes</h2>
                            <p>By Arthur Conan Doyle &nbsp; Editora BOD GmbH DE</p>
                             <b>2016&nbsp;&nbsp;</b> <span> Páginas: 224</span>
                            <p>ISBN:&nbsp; 9780786499076</p>

                            <p>
                            O criador da série Mark Gatiss; Sherlock Holes, elementar meu caro Watson, o lendário detetive retorna em sua aventura mais eletrizante e o texto vem acompanhado de uma introdução escrita por Mark Gatiss
                            </p>
                        </div>
                    </section>
                    <section>
                        <div className="image">
                            <img src={sherlock} alt="" />
                            <button className="btn-yellow">Adicionar</button>
                        </div>
                        <div className="info">
                            <h2>Sherlock - O retorno de Sherlock Holmes</h2>
                            <p>By Arthur Conan Doyle &nbsp; Editora BOD GmbH DE</p>
                             <b>2016&nbsp;&nbsp;</b> <span> Páginas: 224</span>
                            <p>ISBN:&nbsp; 9780786499076</p>

                            <p>
                            O criador da série Mark Gatiss; Sherlock Holes, elementar meu caro Watson, o lendário detetive retorna em sua aventura mais eletrizante e o texto vem acompanhado de uma introdução escrita por Mark Gatiss
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}