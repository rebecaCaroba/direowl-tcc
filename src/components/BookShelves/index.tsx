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
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                            </div>
                        <div className='book'>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                            </div>
                        <div className='book'>
                            <Link to=''><img src={ExLivro} alt="" /></Link>
                            </div>
                    </section>
                <div className='bookshelve'></div>
            </div>
        </main>
    )
}
