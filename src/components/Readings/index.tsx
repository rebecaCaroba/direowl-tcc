import { useNavigate } from "react-router-dom"
import { FaPlayCircle } from 'react-icons/fa'

interface BookReadType {
    schedule_id: number,
    user_id: number,
    created_at: Date,
    book_id: number,
    book_title: string,
    imageLinks: string
    complete: boolean
}


interface PropsReadings {
    bookRead: BookReadType[]
}

export function Readings({ bookRead }: PropsReadings) {
    const navigate = useNavigate()

    function GoToBook(bookId: number) {
        navigate(`/library/book/${bookId}`)
    }

    return (
        <div className="profile-leituras-em-andamento">
            {bookRead.length > 0 ?
                bookRead.map((item, index) => (
                    <div className="profile-leituras-container" key={index}>
                        <div className="profile-leituras-info">
                            <img src={item.imageLinks} alt={item.book_title} />
                            <div>
                                <h2>{item.book_title}</h2>
                                <p>{item.complete == true ? 'Finalizado' : 'Em andamento'}</p>
                            </div>
                        </div>
                        <button onClick={() => GoToBook(item.book_id)} className='button-timer'>
                            <FaPlayCircle />
                        </button>
                    </div>
                )) : (
                    <h2>Não há leituras disponíveis</h2>
                )
            }
        </div>
    )
}