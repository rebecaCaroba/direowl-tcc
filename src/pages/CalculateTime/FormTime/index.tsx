import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as z from 'zod'
import './style.scss'

interface ResCalculateTimeType {
    minutesDay: number,
    amoutPags: number,
    horus: number
    pagesDay: number
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
    pagRead: z.number().min(1, {message: 'No mínimo 1 página'}),
    daysToRead: z.number().min(1, {message: 'No mínimo 1 dia'})
})

type FormTimeInput = z.infer<typeof FormTimeSchema>

export function FormTime({setStep, time, setResCalculateTime}: FormTimeProps) {
    const { totalPages } = useParams()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTimeInput>({
        resolver: zodResolver(FormTimeSchema),
    })

    function handleCalculateTime(data:FormTimeInput) {
 
        const {daysToRead, pagRead} = data

        const numericTotalPages = Number(totalPages)
        const timePages = (time.minutes + (time.seconds / 60)) / pagRead
        const pagesDay = Math.round(numericTotalPages / daysToRead)
        const totalReadingTime = numericTotalPages * timePages
        const tHours = Math.ceil(totalReadingTime / 60)
        const dailyTime = Math.ceil(pagesDay * timePages)
        
        setResCalculateTime({
            minutesDay: dailyTime,
            amoutPags: numericTotalPages,
            horus: tHours,
            pagesDay: pagesDay,
            daysToRead: daysToRead
          })
        setStep((state: number) => state + 1)
    }

    return (
        <div className='form-time-container'>
            <h1>Calcule seu tempo</h1>
            <form className='form-time-form' onSubmit={handleSubmit(handleCalculateTime)}>
                <label htmlFor="pagRead">Quantas páginas você leu? </label>
                <input type="number" id="pagRead" {...register('pagRead', {valueAsNumber: true})} />
                <span className='span-erros'>{errors.pagRead?.message ? errors.pagRead?.message : ''}</span>

                <label htmlFor="daysToRead">Em quantos dias você deseja ler seu livro? </label>
                <input type="number" id="daysToRead" {...register('daysToRead', {valueAsNumber: true})}/>
                <span className='span-erros'>{errors.daysToRead?.message ? errors.daysToRead?.message : ''}</span>

                <button className='btn-yellow' type="submit"> Calcular </button>
            </form>
        </div>
    )
}