import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import * as z from 'zod'
import './style.scss'
import { useContext } from 'react'
import { TooltipContext } from '../../../context/TooltipContext'

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
    pagI: z.string().min(1, {message: 'No mínimo 1 página'}).regex(/^\d+$/, {message: 'Apenas números inteiros'}),
    pagF: z.string().min(1, {message: 'No mínimo 1 página'}).regex(/^\d+$/, {message: 'Apenas números inteiros'}),
    daysToRead: z.string().min(1, {message: 'No mínimo 1 dia'}).regex(/^\d+$/, {message: 'Apenas números inteiros'})
})

type FormTimeInput = z.infer<typeof FormTimeSchema>

export function FormTime({ setStep, time, setResCalculateTime }: FormTimeProps) {
    const { totalPages } = useParams()
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormTimeInput>({
        resolver: zodResolver(FormTimeSchema),
    })
    
    function handleCalculateTime(data: FormTimeInput) {
        const { daysToRead, pagF, pagI } = data

        if(pagI > pagF) {
            TextTooltip("A página inicial não pode ser maior que a página final.")
            ShowTooltip(true)
            ErrorTooltip(true)
            return
        }else if( pagI == pagF) {
            TextTooltip("As páginas inicial e final não podem ser iguais.")
            ShowTooltip(true)
            ErrorTooltip(true)
            return
        }

        const daysToReadNum = Number(daysToRead)
        const pagFNum = Number(pagF)
        const pagINum = Number(pagI)
        
        const totalPagesNum = Number(totalPages)
        const paginasRestantes = totalPagesNum - pagFNum
        const paginasPorMinuto = (pagFNum - pagINum) / (time.minutes + (time.seconds / 60))
        const tempoPorPag = 1 / paginasPorMinuto
        const tempoTotal = Math.ceil(paginasRestantes * tempoPorPag)
        const leituraPorDia = Math.round(tempoTotal / daysToReadNum)

        setResCalculateTime({
            minutesDay: leituraPorDia,
            amoutPags: totalPagesNum,
            minutesTotal: tempoTotal,
            daysToRead: daysToReadNum
        })
        setStep((state: number) => state + 1)
    }

    return (
        <div className='form-time-container'>
            <h1>Calcule seu tempo</h1>
            <form className='form-time-form' onSubmit={handleSubmit(handleCalculateTime)}>
                <label htmlFor="pagRead">Qual página você iniciou? </label>
                <input type="text" id="pagRead" {...register('pagI')} />
                <span className='span-erros'>{errors.pagI?.message ? errors.pagI?.message : ''}</span>

                <label htmlFor="pagRead">Qual página você parou? </label>
                <input type="text" id="pagRead" {...register('pagF')} />
                <span className='span-erros'>{errors.pagF?.message ? errors.pagF?.message : ''}</span>

                <label htmlFor="daysToRead">Em quantos dias você deseja ler seu livro? </label>
                <input type="text" id="daysToRead" {...register('daysToRead')} />
                <span className='span-erros'>{errors.daysToRead?.message ? errors.daysToRead?.message : ''}</span>

                <button className='btn-yellow' type="submit"> Calcular </button>
            </form>
        </div>
    )
}
