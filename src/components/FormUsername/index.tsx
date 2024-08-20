import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../../lib/axios/index.ts'
import { AxiosError } from 'axios'
import { useContext } from 'react'
import { ModalMessageContext } from '../../context/ModalMessageContext/index.tsx'
import { UserContext } from '../../context/UserContext.tsx/index.tsx'

const FormUsernameSchema = z.object({
    username: z
        .string()
        .min(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres' })
        .regex(/^([a-z\\-]+)$/i, { message: 'Use apenas letras, números ou traços' }),
})

type FormUsernameInput = z.infer<typeof FormUsernameSchema>

interface FormUsernameProps {
    user: {
        id: number
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
    const { ShowModalMessage, TextModalMessage, ErrorModalMessage } = useContext(ModalMessageContext)
    const { getUser } = useContext(UserContext)

    async function handleusername(data: FormUsernameInput) {
        if (data.username == user?.name) {

            TextModalMessage('O nome que você inseriu já é o seu nome atual. Por favor, insira um nome diferente.')
            ShowModalMessage(true)
            ErrorModalMessage(true)
            return
        }

        try {
            const token = localStorage.getItem('token')
            const response = await api.patch('update-username', {
                newUsername: data.username,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            getUser()

            if (response.data.message) {
                TextModalMessage(response.data.message)
                ShowModalMessage(true)
            }
            
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextModalMessage(err.response.data.message)
                ShowModalMessage(true)
                ErrorModalMessage(err.response.data.error)
                return
            }
            console.log(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(handleusername)} className='cont'>
            <p>Nome:</p>
            <input type="text" id="name" {...register('username')} placeholder={user?.name} />
            <span>{errors.username?.message ? errors.username?.message : ''}</span>

            <button type='submit' className="btn-yellow btn-deletar">Alterar</button>
        </form>
    )
}