import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { api } from "../../../lib/axios"
import './style.scss'

interface AllBooksType {
    id: number
    title: string,
    author: string[],
    publisher: string,
    publishedDate: string,
    pages: number,
    description: string,
    imageLinks: string,
    isbn13?: number | string
}

export function Catalog() {
    const [allBooks, setAllBooks] = useState<AllBooksType[]>([])
    const { catalogId } = useParams()

    useEffect(() => {
        async function getBooksFromCatalog(catalogId: string | undefined) {
            const token = localStorage.getItem('token')

            try {
                const response = await api.get(`get-books-from-catalog/${catalogId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                setAllBooks(response.data.result)
            } catch (err) {
                console.log(err)
            }

        }

        getBooksFromCatalog(catalogId)
    }, [catalogId])

    return (
        <div className="Catalog">
            {allBooks.map((book) => (
                <div className="catalog-container">
                    <div className="catalog-content">
                        <div className="catalog-info">
                            <img src={book.imageLinks} alt="" />
                            <div>
                                <h2>{book.title}</h2>
                                <div className={'catalog-text collapsed'}>
                                    <p>{book.description}</p>
                                </div>
                                <br />
                                <Link to={`/library/book/${book.id}`}>
                                    Ver mais
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    )
}