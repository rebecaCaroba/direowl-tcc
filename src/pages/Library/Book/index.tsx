import { RiTimerLine } from "react-icons/ri";
import './style.scss'
import { ReadingSchedule } from '../../../components/ReadingSchedule';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';
import { Notes } from "../../../components/Notes";

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

    if (!book) {
        return <div>Loading...</div>
    }

    return (
        <main className='book'>
            <section className='book-container'>
                <div className='book-info'>
                    
                    <h1 className='text-yellow'>{book.title}</h1>
                    <cite>By {book.author}</cite> <span>&nbsp;&nbsp;&nbsp; Editora {book.publisher}</span>
                    <span className='timer'><RiTimerLine /> 18 horas e 30 mins</span>

                    <p>{book.description}</p>

                    <div className="book-btn">
                        <button className='button-read'>
                            <Link to={`/calculate-time/${bookId}/${book.pages}`} >LER AGORA</Link>
                        </button>
                        <button className='button-fav'>ADICIONAR NOTAS</button></div>
                    </div>
                <div className="book-image">
                    <img src={book.imageLinks} alt="" />
                </div>
            </section>
            <Notes bookId={bookId}/>
            <ReadingSchedule bookId={bookId} />
        </main>
    )
}
