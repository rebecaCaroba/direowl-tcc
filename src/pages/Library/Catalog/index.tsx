import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
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

    const navigate = useNavigate();


    function handleBook(bookId: number) {
        navigate(`/library/book/${bookId}`)
    }

    return (
        <div className="catalog">
            {allBooks.map((book) => (
                <div className="book-card" onClick={() => handleBook(book.id)}>
                    <div className="book-image">
                        <img src={book.imageLinks} alt="Book Cover" />
                    </div>
                    <div className="book-details">
                        <h2>{book.title}</h2>
                        <p className="author">{book.author}</p>
                        <p className="year-pages">{book.pages} páginas</p>
                        <p className="description">
                            {book.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}