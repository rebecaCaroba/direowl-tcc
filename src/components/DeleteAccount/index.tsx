import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../../lib/axios/index.ts'
import { AxiosError } from 'axios'
import { useContext } from 'react'
import { TooltipContext } from '../../context/TooltipContext/index.tsx'
import { NotificationModalContext } from '../../context/NotificationModalContext/index.tsx'
import { UserContext } from '../../context/UserContext/index.tsx'
import { useNavigate } from 'react-router-dom'

const DeleteAccountSchema = z.object({
    username: z
        .string()
})

type DeleteAccountInput = z.infer<typeof DeleteAccountSchema>

interface DeleteAccountProps {
    user: {
        name: string
        email: string
    } | null
}

export function DeleteAccount({ user }: DeleteAccountProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<DeleteAccountInput>({
        resolver: zodResolver(DeleteAccountSchema),
    })
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const { messageModal, showModal } = useContext(NotificationModalContext)
    const { logout } = useContext(UserContext)
    const navigate = useNavigate()
    
    async function handleDeleteUser() {
        try {
            await api.delete(`/delete-user`)
            logout()
            navigate('/')

        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
        }
    }

    function confirmDelete(data: DeleteAccountInput) {
        if(data.username !== user?.name) {
            return
        }

        messageModal('Você tem certeza que deseja excluir à sua conta? Todos os dados serão deletados.')
        showModal(() => handleDeleteUser())
    }

    return (
        <form onSubmit={handleSubmit(confirmDelete)} className='cont'>
            <p>Insira seu nome de usuário:</p>
            <input type="text" id="name" {...register('username')} placeholder={user?.name} />
            <button type='submit' className="btn-deletar" style={{ marginLeft: '1rem' }}>Deletar</button>
            <br /><br />
            <div>
                <span>{errors.username?.message ? errors.username?.message : ''}</span>
            </div>

        </form>
    )
}