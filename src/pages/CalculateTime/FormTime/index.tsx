import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as z from 'zod'
import './style.scss'

interface ResCalculateTimeType {
    minutesDay: number,
    amoutPags: number,
    minutesTotal: number
    daysToRead: number
}

interface TimeType {
    minutes: number,
    seconds: number
}

interface FormTimeProps {
    setStep: React.Dispatch<React.SetStateAction<number>>
    time: TimeType
    setResCalculateTime: React.Dispatch<React.SetStateAction<ResCalculateTimeType>>
}

const FormTimeSchema = z.object({
    pagI: z.number().min(1, { message: 'No mínimo 1 página' }),
    pagF: z.number().min(1, { message: 'No mínimo 1 página' }),
    daysToRead: z.number().min(1, { message: 'No mínimo 1 dia' })
})

type FormTimeInput = z.infer<typeof FormTimeSchema>

export function FormTime({ setStep, time, setResCalculateTime }: FormTimeProps) {
    const { totalPages } = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTimeInput>({
        resolver: zodResolver(FormTimeSchema),
    })

    function handleCalculateTime(data: FormTimeInput) {

        const { daysToRead, pagF, pagI } = data
        
        const totalPagesNum = Number(totalPages)
        const paginasRestantes = totalPagesNum - pagF
        const paginasPorMinuto = (pagF - pagI) / (time.minutes + (time.seconds / 60))
        const tempoPorPag = 1 / paginasPorMinuto
        const tempoTotal = Math.ceil(paginasRestantes * tempoPorPag)
        const leituraPorDia = Math.round(tempoTotal / daysToRead)

        setResCalculateTime({
            minutesDay: leituraPorDia,
            amoutPags: totalPagesNum,
            minutesTotal: tempoTotal,
            daysToRead: daysToRead
        })
        setStep((state: number) => state + 1)
    }

    return (
        <div className='form-time-container'>
            <h1>Calcule seu tempo</h1>
            <form className='form-time-form' onSubmit={handleSubmit(handleCalculateTime)}>
                <label htmlFor="pagRead">Qual página você iniciou? </label>
                <input type="number" id="pagRead" {...register('pagI', { valueAsNumber: true })} />
                <span className='span-erros'>{errors.pagI?.message ? errors.pagI?.message : ''}</span>

                <label htmlFor="pagRead">Qual página você parou? </label>
                <input type="number" id="pagRead" {...register('pagF', { valueAsNumber: true })} />
                <span className='span-erros'>{errors.pagF?.message ? errors.pagF?.message : ''}</span>

                <label htmlFor="daysToRead">Em quantos dias você deseja ler seu livro? </label>
                <input type="number" id="daysToRead" {...register('daysToRead', { valueAsNumber: true })} />
                <span className='span-erros'>{errors.daysToRead?.message ? errors.daysToRead?.message : ''}</span>

                <button className='btn-yellow' type="submit"> Calcular </button>
            </form>
        </div>
    )
}
