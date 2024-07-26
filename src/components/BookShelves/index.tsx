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
    console.log(catalogs)
        const categories = catalogs.reduce((acc, book) => {
        if (!acc[book.name]) {
            acc[book.name] = [];
        }
        acc[book.name].push(book);
        return acc;
    }, {} as Record<string, CatalogType[]>);


    return (
        <main>
                {
                    Object.entries(categories).map(([categoryName, books]) => {
                        return (
                            <div className='bookshelves-container' key={categoryName}>
                                <h1 className='text-yellow'>{categoryName}</h1>
                                <section className='bookshelves-content'>
                                    <div className='bookshelves-book'>
                                    {books.map((book) => (
                                        <div key={book.id}>
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
                }
        </main>
    )
}