import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../../lib/axios"

interface ResCalculateTimeProps {
    resCalculateTime: {
        minutesDay: number,
        amoutPags: number,
        horus: number
        pagesDay: number
        daysToRead: number
    }
}

interface ResCalculateTimeType {
    minutesDay: number,
    amoutPags: number,
    horus: number
    pagesDay: number
    daysToRead: number
}

export function ResCalculateTime({ resCalculateTime }: ResCalculateTimeProps) {
    const { bookId } = useParams()
    const navigate = useNavigate()

    async function handleCreateTimeLine(data: ResCalculateTimeType) {
        const token = localStorage.getItem('token')
        
        try {
            const response = await api.post('/create-schedule', {
                minutesDay: data.minutesDay,
                amoutPags: data.amoutPags,
                pagesDay: data.pagesDay,
                daysToRead: data.daysToRead,
                bookId: bookId,
            }
            ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )


            await api.post('/create-dayRead', {
                schedule_id: response.data.result.id,
                day: 1,
                seconds: 0,
                is_read: false,

            })


            navigate(`/library/book/${bookId}`)

        }catch (err) {
            console.log(err)
        }
    }


    const formatHours = (horus: number) => {
        const h = Math.floor(horus)
        const m = Math.round((horus - h) * 60)

        return `${h}${m}min`
    }


    return (
        <div className="result-time-container">
            <h1>Resultado</h1>
            <p>
                {`Para concluir a leitura de ${resCalculateTime.amoutPags} páginas, você precisará ler:`}
            </p>
            <h1>{`${resCalculateTime.minutesDay} minutos por dia`}</h1>
            <span>{`Total estimado: ${formatHours(resCalculateTime.horus)}`}</span>
            <button className="btn-yellow" onClick={() => handleCreateTimeLine(resCalculateTime)}>Concluir</button>
        </div>
    )
}