import { useParams } from "react-router-dom"
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

    function handleCreateTimeLine(data: ResCalculateTimeType) {
        const token = localStorage.getItem('token')
        
        const response = api.post('/create-timeline', {
            minutesDay: data.minutesDay,
            amoutPags: data.amoutPags,
            pagesDay: data.pagesDay,
            daysToRead: data.daysToRead,
            bookId: bookId,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log(response)
    }


    const formatHours = (horus: number) => {
        const h = Math.floor(horus)
        const m = Math.round((horus - h) * 60)

        return `${h}h${m}min`
    }


    return (
        <div className="result-time-container">
            <h1>Resultado</h1>
            <p>
                {`Tempo necessário por dia para concluir a leitura de ${resCalculateTime.amoutPags} páginas:`}
            </p>
            <h1>{`${resCalculateTime.minutesDay} minutos por dia`}</h1>
            <span>{`Aproximadamente: ${formatHours(resCalculateTime.horus)}`}</span>
            <button className="btn-yellow" onClick={() => handleCreateTimeLine(resCalculateTime)}>Concluir</button>
        </div>
    )
}