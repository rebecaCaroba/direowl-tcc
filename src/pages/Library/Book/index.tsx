import './style.scss'
import { ReadingSchedule } from '../../../components/ReadingSchedule';
import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import { AxiosError } from 'axios';
import { TooltipContext } from '../../../context/TooltipContext';
import { NotificationModalContext } from '../../../context/NotificationModalContext';
import { ScheduleContext } from '../../../context/ScheduleContext';
import semImagem from '../../../assets/semImagem.png'
import Gif from '../../../assets/corujinhaaaaa .gif'

interface BookType {
    title: string,
    author: string[],
    publisher: string,
    publishedDate: string,
    pages: number,
    description: string,
    imageLinks?: string,
    isbn?: number | string
}

export function Book() {
    const { bookId } = useParams()
    const [book, setBook] = useState<BookType | null>(null)
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const { showModal, messageModal } = useContext(NotificationModalContext)
    const { getSchedule, schedule } = useContext(ScheduleContext)
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
                
            }
        }

        getBook(bookId)
        getSchedule(bookId)
    }, [bookId])

    

    async function handleDeleteBook() {
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
            
        }

    }


    function confirmDelete() {
        messageModal('Você tem certeza que quer deletar este livro? Está ação ira apagar o cronograma deste livro.')
        showModal(handleDeleteBook)
    }

    if (!book) {
        return <div className='gif-container'> <img src={Gif} width={200} /></div>
    }

    return (
        <main className='book'>
            <section className='book-container'>
                <div className='book-info'>
                    <h1 className='text-yellow'>
                        {book.title}&nbsp;&nbsp;

                        <data>
                            {book.publishedDate}
                        </data>
                    </h1>
                    <cite><b>By</b> {book.author || 'Autor não registrado'}</cite> <span>&nbsp;&nbsp;&nbsp; <b>Editora</b> {book.publisher || 'Editora não registrada'}</span>
                    <br /><br />
                    <span><b>ISBN:</b> {book.isbn || 'ISBN não registrado'}</span>
                    <span>&nbsp;&nbsp;&nbsp; {book.pages} páginas</span>
                    <p>{book.description || 'Descrição não registrada'}</p>

                    <div className="book-btn">
                        <button onClick={() => {navigate(`/library/book/notes/${bookId}`)}} 
                        className='button-fav'>
                            ADICIONAR NOTAS
                        </button>
                        <button onClick={() => { navigate(`/calculate-time/${bookId}/${book.pages}`) }
                        }
                            className='button-read'
                            disabled={schedule.length > 0 ? true : false}
                        >
                            LER AGORA
                        </button>
                    </div>
                </div>
                <div className='book-action'>
                    <div className="book-image">
                        <img src={book.imageLinks ?book.imageLinks : semImagem} alt="" />

                    </div>
                    <button onClick={confirmDelete} className='button-delete'> Deletar</button>

                </div>

            </section>
            <ReadingSchedule bookId={bookId} book={book} />
        </main>
    )
}
