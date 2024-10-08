import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { api } from '../../lib/axios'
import { Link, useNavigate } from 'react-router-dom'
import { AxiosError } from 'axios'
import logo from '../../assets/logobranca.svg'
import { useContext } from 'react'
import { TooltipContext } from '../../context/TooltipContext'

const newAccountFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O nome de usuário deve ter pelo menos 3 caracteres' })
    .regex(/^([a-z\\-]+)$/i, { message: 'Use apenas letras, números ou traços e sem espaço' }),
  email: z.
    string()
    .min(1, { message: 'Email inválido' })
    .email('Email inválido'),
  password: z.string().min(8, { message: 'A senha deve conter pelo menos 8 caracteres' })
    .regex(/^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{8,30}$/, { message: 'Use caracteres especias, números e letras minúsculas e maiúsculas' }),
  confirmPassword: z.string(),
})
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type NewAccountInputs = z.infer<typeof newAccountFormSchema>

export function Register() {
  const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<NewAccountInputs>({
    resolver: zodResolver(newAccountFormSchema),
  })

  const navigate = useNavigate();

  async function handleCreatAccount(data: NewAccountInputs) {
    try {
      const response = await api.post('/register', {
        username: data.username,
        email: data.email,
        password: data.password
      })

      navigate('/')
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
      console.log(err)
    }
  }

  return (
    <div className='container'>
      <img src={logo} width={80} />
      <form onSubmit={handleSubmit(handleCreatAccount)} className="form-container">
        <h1>Cadastro</h1>
        <label htmlFor="username">Nome</label>
        <input
          type="text"
          id="username"
          placeholder='John'
          {...register('username')}
        />
        <span>{errors.username?.message ? errors.username?.message : ''}</span>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder='Example@email.com'
          {...register('email')}
        />
        <span>{errors.email?.message ? errors.email?.message : ''}</span>

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          placeholder='Pelo menos 8 caracteres'
          {...register('password')}
        />
        <span>{errors.password?.message ? errors.password?.message : ''}</span>

        <label htmlFor="confirmPassword">Confirmar senha</label>
        <input
          type="password"
          id="confirmPassword"
          placeholder='Confirmar senha'
          {...register('confirmPassword')}
        />
        <span>{errors.confirmPassword?.message ? errors.confirmPassword?.message : ''}</span>

        <p>Já tem uma conta? <Link to="/">Conecte-se</Link></p>
        <button disabled={isSubmitting}
          type="submit">Cadastrar</button>
      </form>
    </div>
  )
}