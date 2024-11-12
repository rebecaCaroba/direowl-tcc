import { TooltipContext } from '../../context/TooltipContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import { AxiosError } from 'axios'
import { api } from '../../lib/axios'
import * as z from 'zod'

const FormPasswordSchema = z.object({
    newPassword: z.string().min(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
    .regex(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,30}$/, { message: 'Use caracteres especias, números e letras minúsculas e maiúsculas' }),
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
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)


    async function handlePassword(data: FormPasswordInput) {
        try {
            const response = await api.patch('/update-password', {
                password: data.newPassword
            })

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