import { Link, useNavigate } from 'react-router-dom'
import * as z from 'zod'
import './style.scss'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import logo from '../../assets/logobranca.svg'
import { api } from '../../lib/axios'
import { AxiosError } from 'axios'
import { useEffect } from 'react'

const LoginAccountFormSchema = z.object({
  email: z.
    string()
    .min(1, { message: 'O email não pode ter apenas 1 caracter' })
    .email('Email inválido'),
  password: z.string().min(4, { message: 'A senha deve ter no mínimo 4 caracteres.' }),
})

type LoginAccountInputs = z.infer<typeof LoginAccountFormSchema>

export function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginAccountInputs>({
    resolver: zodResolver(LoginAccountFormSchema),
  })

  const navigate = useNavigate()

  useEffect(() => {
    async function verifyAuthUser() {
      try {
        await api.get('/checkauth')
        navigate('/library')

      } catch (err) {
        localStorage.clear()
        console.log(err)
        return
      }
    }

    verifyAuthUser()
  }, [])

  async function handleLoginAccount(data: LoginAccountInputs) {
    try {
      const response = await api.post('/login', {
        email: data.email,
        password: data.password,
      })
      localStorage.setItem('token', response.data.token)

      navigate('/library')

    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      console.log(err)
    }
  }

  const password = watch('password')
  const isSubmitDisabled = !password

  return (
    <div className='container'>
      <img src={logo} width={80} />
      <form onSubmit={handleSubmit(handleLoginAccount)} className='form-container'>
        <div className='logo-title'>
          <h1>Login do usuário</h1>
        </div>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder='Example@email.com'
          {...register('email')}
        />
        <span className='span-erros'>{errors.email?.message ? errors.email?.message : ''}</span>

        <label htmlFor="password">Senha</label>
        <input type="password"
          id="password"
          placeholder='Pelo menos 8 caracteres'
          {...register('password')}
        />
        <span className='span-erros'>{errors.password?.message ? errors.password?.message : ''}</span>

        <p>Não tem uma conta? <Link to="/register">Criar uma</Link></p>
        <button disabled={isSubmitDisabled} type="submit">Entrar</button>
      </form>
    </div>
  )
}