import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../../lib/axios/index.ts'
import { AxiosError } from 'axios'
import { useContext } from 'react'
import { TooltipContext } from '../../context/TooltipContext/index.tsx'
import { UserContext } from '../../context/UserContext/index.tsx'

const FormUsernameSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres' })
        .regex(/^[a-zA-Z0-9\\-]+$/, { message: 'Use apenas letras, números ou traços' }),
})

type FormUsernameInput = z.infer<typeof FormUsernameSchema>

interface FormUsernameProps {
    user: {
        name: string
        email: string
    } | null
}

export function FormUsename({ user }: FormUsernameProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormUsernameInput>({
        resolver: zodResolver(FormUsernameSchema),
    })
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const { getUser } = useContext(UserContext)

    async function handleusername(data: FormUsernameInput) {
        if (data.username == user?.name) {

            TextTooltip('O nome que você inseriu já é o seu nome atual. Por favor, insira um nome diferente.')
            ShowTooltip(true)
            ErrorTooltip(true)
            return
        }

        try {
            const response = await api.patch('/update-username', {
                newUsername: data.username,
            })
            getUser()

            if (response.data.message) {
                TextTooltip(response.data.message)
                ShowTooltip(true)
            }

        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            
        }
    }

    return (
        <form onSubmit={handleSubmit(handleusername)} className='cont'>
            <p>Nome:</p>
            <input type="text" id="name" {...register('username')} placeholder={user?.name} />
            <button type='submit' className="btn-yellow">Alterar</button>
            <br /><br />
            <div>
                <span>{errors.username?.message ? errors.username?.message : ''}</span>
            </div>

        </form>
    )
}