import { Link } from 'react-router-dom'
import sherlock from '../../assets/sherlock.jpg'
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
                            <Link to=''><img src='http://books.google.com/books/content?id=K3yzEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src='http://books.google.com/books/content?id=s6iWDwAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src='http://books.google.com/books/content?id=mJhyDQAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src='http://books.google.com/books/content?id=djcdDAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' alt="" /></Link>
                        </div>
                        <div>
                            <Link to=''><img src='http://books.google.com/books/content?id=XIqWEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' alt="" /></Link>
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
                            <Link to='book'><img src={sherlock} alt="" /></Link>
                        </div>
                        <div>
                            <Link to='/book'><img src='http://books.google.com/books/content?id=i9zPEAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' alt="" /></Link>
                        </div>
                        <div>
                            <Link to='/book'><img src='http://books.google.com/books/content?id=Ww_9AwFJBv8C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api' alt="" /></Link>
                        </div>
                        <div>
                            <Link to='/book'><img src={ExLivro} alt="" /></Link>
                        </div>
                        <div>
                            <Link to='/book'><img src={ExLivro} alt="" /></Link>
                        </div>
                    </div>
                    <div className='bookshelve'></div>
                </section>
            </div>
        </main>
    )
}
