import { Link } from 'react-router-dom'
import ExLivro from '../../assets/exLivro.jpg'
import './style.scss'

export function BookShelves() {
    return (
        <main>
            <div className='bookshelves-container'>
                <h1>Livros de comédia</h1>
                <section className='bookshelves-content'>
                    <div className='book'>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                    </div>
                    <div className='bookshelve'></div>
                </section>
            </div>
            <div className='bookshelves-container'>
                <h1>Livros de comédia</h1>
                <section className='bookshelves-content'>
                    <div className='book'>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                        </div>
                    </div>
                    <div className='bookshelve'></div>
                </section>
            </div>
        </main>
    )
}
