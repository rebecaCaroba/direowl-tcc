import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../../lib/axios"

interface ResCalculateTimeProps {
    resCalculateTime: {
        minutesDay: number,
        amoutPags: number,
        minutesTotal: number
        pagesDay: number
        daysToRead: number
    }
}

interface ResCalculateTimeType {
    minutesDay: number,
    amoutPags: number,
    minutesTotal: number
    daysToRead: number
}

export function ResCalculateTime({ resCalculateTime }: ResCalculateTimeProps) {
    const { bookId } = useParams()
    const navigate = useNavigate()

    async function handleCreateTimeLine(data: ResCalculateTimeType) {
        
        try {
            const response = await api.post('/create-schedule', {
                minutesDay: data.minutesDay,
                amoutPags: data.amoutPags,
                daysToRead: data.daysToRead,
                totalMinutes: data.minutesTotal,
                bookId: bookId,
            })


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


    const formatHours = (minutes: number) => {
        const h = Math.floor(minutes / 60); 
        const m = Math.round(minutes % 60); 
    
        return `${h}h ${m}min`;
    }


    return (
        <div className="result-time-container">
            <h1>Resultado</h1>
            <p>
                {`Para concluir a leitura de ${resCalculateTime.amoutPags} páginas em ${resCalculateTime.daysToRead}, você precisará ler:`}
            </p>
            <h1>{`${resCalculateTime.minutesDay} minutos por dia`}</h1>
            <span>{`Total estimado: ${formatHours(resCalculateTime.minutesTotal)}`}</span>
            <button className="btn-yellow" onClick={() => handleCreateTimeLine(resCalculateTime)}>Concluir</button>
        </div>
    )
}