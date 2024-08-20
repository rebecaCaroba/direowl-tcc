import { ModalMessageContext } from '../../context/ModalMessageContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { AxiosError } from 'axios'
import { api } from '../../lib/axios'
import * as z from 'zod'

const FormPasswordSchema = z.object({
    newPassword: z.string().min(4, { message: 'A senha deve conter pelo menos 4 caracteres' }),
    confirmPassword: z.string(),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "As senhas não coincidem",
        path: ["confirmPassword"],
    })

type FormPasswordInput = z.infer<typeof FormPasswordSchema>

export function FormPassword() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormPasswordInput>({
        resolver: zodResolver(FormPasswordSchema),
    })
    const { ShowModalMessage, TextModalMessage, ErrorModalMessage } = useContext(ModalMessageContext)


    async function handlePassword(data: FormPasswordInput) {
        console.log(data.newPassword)
        const token = localStorage.getItem('token')
        try {
            const response = await api.patch('update-password', {
                password: data.newPassword
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

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
        <form onSubmit={handleSubmit(handlePassword)} className='cont' id='profile-password'>
            <section className='inputs'>
                <div>
                    <p>Nova senha:</p>
                    <input type="password" id="new-password" {...register('newPassword')} />
                </div>

                <div>
                    <p>Confirmar nova senha:</p>
                    <input type="password" id="confirm-password" {...register('confirmPassword')} />
                </div>
                <button type='submit' className="btn-yellow btn-deletar">Alterar</button>
            </section>
            <br />
            <div>
                <span>{errors.confirmPassword?.message || errors.newPassword?.message ? errors.confirmPassword?.message || errors.newPassword?.message : ''}</span>
            </div>

        </form>
    )
}