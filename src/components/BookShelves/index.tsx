import { Link } from 'react-router-dom'
import semImagem from '../../assets/semImagem.png';

import { FaAngleRight } from "react-icons/fa6"
import './style.scss'

interface PropsBookShelves {
    categories: {
        [catalogName: string]: {
            catalogId: number
            books: {
                id: number
                name: string
                imageLinks: string
                title: string
            }[]
        }
    }
}


export function BookShelves({ categories }: PropsBookShelves) {
    return (
        <main className='bookshelves'>
            {Object.entries(categories).map(([catalogName, data], index) => {
                return (
                    <div className='bookshelves-container' key={index}>
                        <div className="bookshelves-title-catalog">
                            <h1 className='text-yellow'>{catalogName}</h1>
                            <Link to={`catalog/${data.catalogId}`}>
                                <FaAngleRight />
                            </Link>
                        </div>
                        <section className='bookshelves-content'>
                            <div className='bookshelves-book'>
                                {data.books.slice(0, 6).map((book) => (  
                                    <div className='content-book' key={book.id}>
                                        <Link to={`book/${book.id}`}>
                                            <img src={book.imageLinks ? book.imageLinks : semImagem} title={book.title} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className='bookshelve'></div>
                        </section>
                    </div>
                )
            })
            }
        </main>
    )
}
