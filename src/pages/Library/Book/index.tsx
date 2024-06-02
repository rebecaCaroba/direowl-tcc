import exLivro from '../../../assets/exLivro.jpg'
import './style.scss'

export function Book() {
    return (
        <main>
            <section className='book-container'>
                <section className="book-cover-container">
                    <div className='book-cover-content'>
                        <img src={exLivro} alt="" />
                        <section className='book-cover-info'>
                            <div>
                                <h1>Harry Potter: Half Blood Prince</h1>
                                <cite>Jeff Kinney</cite>
                                <br />
                            </div>
                            <button>Começar a ler</button>
                        </section>
                    </div>
                </section>
                <section className='book-info'>
                        <div>
                            <h3>Descrição</h3>
                            <p>Não é fácil ser criança. E ninguém sabe disso melhor do que Greg Heffley, que se vê mergulhado no ensino fundamental, onde fracotes subdesenvolvidos dividem os corredores com garotos mais altos, mais malvados e que já se barbeiam. Em Diário de um Banana, Greg nos conta as desventuras de sua vida escolar. Em busca de um pouco de popularidade (e também de um pouco de proteção), o garoto se envolve em uma série de situações que procura resolver de uma maneira muito particular. No primeiro livro da coleção, o autor e ilustrador Jeff Kinney nos apresenta um herói improvável e encantador. Um garoto comum às voltas com os desafios da puberdade</p>
                        </div>
                        <div>
                            <h3>Editora e data de publicação</h3>
                            <p>Vergara e Riba Editoras S/A,</p>
                            <data>2013-05-23</data>
                            <h3>Categoria</h3>
                            <p>Ficção Juvenil, 244</p>
                            <h3>identificadores</h3>
                            <p>ISBN: 9788576835189</p>
                        </div>
                </section>
            </section>
        </main>
    )
}