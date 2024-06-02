import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const newAccountFormSchema = z.object({
    username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Use apenas letras, números ou traços' })
    .transform((username) => username.toLowerCase()),
    email: z.
    string()
    .min(1, {message: 'Email inválido'})
    .email('Email inválido'),
    password: z.string().min(4, {message: 'A senha deve conter pelo menos 4 caracteres'}),
    confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type NewAccountInputs = z.infer<typeof newAccountFormSchema>

export function Register() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
      } = useForm<NewAccountInputs>({
        resolver: zodResolver(newAccountFormSchema),
      })

      async function handleCreatAccount(data: NewAccountInputs) {
        console.log(data)
    }

    return (
        <div className='container'>
            <form onSubmit={handleSubmit(handleCreatAccount)} className="form-container">
                <h1>Cadastro</h1>
                <label htmlFor="username">Nome</label>
                <input 
                type="text"
                id="username" 
                placeholder='John' 
                {...register('username')}
                />
                <span>{errors.username?.message ? errors.username?.message : '' }</span>

                <label htmlFor="email">Email</label>
                <input 
                type="email" 
                id="email" 
                placeholder='Example@email.com' 
                {...register('email')}
                />
                <span>{errors.email?.message ? errors.email?.message : '' }</span>

                <label htmlFor="password">Senha</label>
                <input 
                type="password" 
                id="password" 
                placeholder='Pelo menos 4 caracteres' 
                {...register('password')}
                />
                <span>{errors.password?.message ? errors.password?.message : '' }</span>

                <label htmlFor="confirmPassword">Confirmar senha</label>
                <input 
                type="password" 
                id="confirmPassword" 
                placeholder='Confirmar senha' 
                {...register('confirmPassword')}
                />
                <span>{errors.confirmPassword?.message ? errors.confirmPassword?.message : '' }</span>

                <button disabled={isSubmitting} 
                type="submit">Entrar</button>
            </form>
        </div>
    )
}