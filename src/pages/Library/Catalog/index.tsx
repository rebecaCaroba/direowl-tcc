import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../../lib/axios"
import semImagem from '../../../assets/semImagem.png'
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
            try {
                const response = await api.get(`get-books-from-catalog/${catalogId}`)

                setAllBooks(response.data.result)
            } catch (err) {
                
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
            {allBooks.map((book , index) => (
                <div key={index} className="book-card" onClick={() => handleBook(book.id)}>
                    <div className="book-image">
                        <img src={book.imageLinks ? book.imageLinks : semImagem} alt="Book Cover" />
                    </div>
                    <div className="book-details">
                        <h2>{book.title}</h2>
                        <p className="author">{book.author || 'Autor não registrado'}</p>
                        <p className="year-pages">{book.pages} páginas</p>
                        <p className="description">
                            {book.description || 'Descrição não registrada'}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}