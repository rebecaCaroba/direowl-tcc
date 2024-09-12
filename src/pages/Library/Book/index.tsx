import './style.scss'
import { ReadingSchedule } from '../../../components/ReadingSchedule';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';
import { Notes } from "../../../components/Notes";
import { MdDelete } from "react-icons/md";
import { TooltipContext } from '../../../context/TooltipContext';


interface BookType {
    title: string,
    author: string[],
    publisher: string,
    publishedDate: string,
    pages: number,
    description: string,
    imageLinks: string,
    isbn13?: number | string
}

export function Book() {
    const { bookId } = useParams()
    const [book, setBook] = useState<BookType | null>(null)
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const navigate = useNavigate()

    useEffect(() => {
        async function getBook(bookId: string | undefined) {
            try {
                const response = await api.get(`get-book/${bookId}`)
                setBook(response.data.book)
            } catch (err) {
                if (err instanceof AxiosError && err?.response?.data?.message) {
                    alert(err.response.data.message)
                    return
                }
                console.log(err)
            }
        }

        getBook(bookId)
    }, [bookId])

    async function handleDeleteBook(bookId: string | undefined) {
        try {
            const response = await api.delete(`delete-book/${bookId}`)

            if (response.data.message) {
                TextTooltip(response.data.message)
                ShowTooltip(true)
            }

            navigate('/library')
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            console.log(err)
        }

    }

    if (!book) {
        return <div>Loading...</div>
    }

    return (
        <main className='book'>
            <header>
                <button onClick={() => handleDeleteBook(bookId)} className='button-delete'><MdDelete size={22} /> Deletar</button>
                <button className='button-fav'>ADICIONAR NOTAS</button>
            </header>
            <section className='book-container'>
                <div className='book-info'>

                    <h1 className='text-yellow'>{book.title}</h1>
                    <cite>By {book.author}</cite> <span>&nbsp;&nbsp;&nbsp; Editora {book.publisher}</span>
                    <span>&nbsp;&nbsp;&nbsp; {book.pages} páginas</span>
                    <p>{book.description}</p>

                    <div className="book-btn">
                        <button className='button-read'>
                            <Link to={`/calculate-time/${bookId}/${book.pages}`} >LER AGORA</Link>
                        </button>
                    </div>
                </div>
                <div className="book-image">
                    <img src={book.imageLinks} alt="" />
                </div>

            </section>
            <Notes bookId={bookId} />
            <ReadingSchedule bookId={bookId} />
        </main>
    )
}
