import { useNavigate, useParams } from "react-router-dom"
import { api } from "../../../lib/axios"
import { TooltipContext } from "../../../context/TooltipContext"
import { useContext } from "react"
import { AxiosError } from "axios"

interface ResCalculateTimeProps {
    resCalculateTime: {
        minutesDay: number,
        amoutPags: number,
        minutesTotal: number
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
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)

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

        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
              }
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
                {`Para concluir a leitura de ${resCalculateTime.amoutPags} páginas em ${resCalculateTime.daysToRead} dias, você precisará ler:`}
            </p>
            <h1>{`${resCalculateTime.minutesDay} ${resCalculateTime.minutesDay > 1 ? "minutos" : "minuto"} por dia`}</h1>
            <span>{`Total estimado: ${formatHours(resCalculateTime.minutesTotal)}`}</span>
            <button className="btn-yellow" onClick={() => handleCreateTimeLine(resCalculateTime)}>Concluir</button>
        </div>
    )
}