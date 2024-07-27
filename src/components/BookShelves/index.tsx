import { Link } from 'react-router-dom'
import './style.scss'

interface CatalogType {
    id: number
    name: string
    imageLinks: string
}

interface BookShelvesProps {
    catalogs: CatalogType[]
}

export function BookShelves({ catalogs }: BookShelvesProps) {
    const categories = catalogs.reduce((acc, book) => {
        if (!acc[book.name]) {
            acc[book.name] = [];
        }
        acc[book.name].push(book);
        return acc;
    }, {} as Record<string, CatalogType[]>)

    const hasCategories = Object.keys(categories).length > 0

    return (
        <main className='bookshelves'>
            {hasCategories ? Object.entries(categories).map(([categoryName, books], index) => {
                return (
                    <div className='bookshelves-container' key={index}>
                        <h1 className='text-yellow'>{categoryName}</h1>
                        <section className='bookshelves-content'>
                            <div className='bookshelves-book'>
                                {books.map((book) => (
                                    <div key={book.id} >
                                        <Link to=''>
                                            <img src={book.imageLinks} alt={book.name} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className='bookshelve'></div>
                        </section>
                    </div>
                )
            })
                :
                <div className='no-categories'>
                    <h1 className='text-yellow'>Nenhum catálogo disponível</h1>
                </div>

            }
        </main>
    )
}