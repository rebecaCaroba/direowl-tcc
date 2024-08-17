import { Link } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { CatalogContext } from '../../context/CatalogContext'
import { UserContext } from '../../context/UserContext.tsx'
import { FaAngleRight } from "react-icons/fa6"
import './style.scss'

export function BookShelves() {

    const { getCatalogAndBooks, catalogs } = useContext(CatalogContext)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            getCatalogAndBooks()
        }
    }, [user])

    console.log(catalogs)

    const categories = catalogs.reduce((acc, item) => {
        if (!acc[item.catalog_name]) {
            acc[item.catalog_name] = { catalogId: item.catalog_id, books: [] }
        }
        acc[item.catalog_name].books.push({
            id: item.book_id,
            name: item.catalog_name,
            imageLinks: item.book_image,
        })
        return acc
    }, {} as Record<string, { catalogId: number; books: { id: number; name: string; imageLinks: string }[] }>)

    const hasCategories = Object.keys(categories).length > 0

    return (
        <main className='bookshelves'>
            {hasCategories ? Object.entries(categories).map(([catalogName, data], index) => {
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
                                {data.books.map((book) => (
                                    <div key={book.id}>
                                        <Link to={`book/${book.id}`}>
                                            <img src={book.imageLinks} alt={book.name} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                            <div className='bookshelve'></div>
                        </section>
                    </div>
                )
            }) :
                <div className='no-categories'>
                    <h1 className='text-yellow'>Nenhum catálogo disponível</h1>
                </div>
            }
        </main>
    )
}
