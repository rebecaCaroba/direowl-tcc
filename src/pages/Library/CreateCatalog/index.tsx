import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { api } from '../../../lib/axios'
import { AxiosError } from 'axios'
import * as z from 'zod'
import './style.scss'
import { useContext } from 'react'
import { ModalMessageContext } from '../../../context/ModalMessageContext'

const CreateCatalogSchema = z.object({
    nameCatalog: z.string().min(2, { message: "O nome do catálogo deve ter no mínimo 2 caracteres." }).max(50, { message: "Limite de 50 caracteres." })
})

type CreateCatalogtInputs = z.infer<typeof CreateCatalogSchema>

export function CreateCatalog() {
    const { ShowModalMessage, TextModalMessage, ErrorModalMessage } = useContext(ModalMessageContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateCatalogtInputs>({
        resolver: zodResolver(CreateCatalogSchema),
    })

    async function handleCreateCatalog(data: CreateCatalogtInputs) {
        try {
            const idUser = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const response = await api.post('/create-catalog',
                {
                    idUser: idUser,
                    nameCatalog: data.nameCatalog,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

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
        <>
            <div className="addcatolog-container">
                <h1 className='text-yelow'>Criar catálogo</h1>
                <div className="addcatalog-content">
                    <form onSubmit={handleSubmit(handleCreateCatalog)}>
                        <label htmlFor="addCatalog">Nome do catálogo</label>
                        <input
                            type="text"
                            max={50}
                            id="addCatalog"
                            placeholder='Meus livros, Romance, Comédia, Desejos...'
                            {...register('nameCatalog')}
                        />
                        <span>{errors.nameCatalog?.message ? errors.nameCatalog?.message : ' '}</span>
                        <button className='btn-yellow' type="submit">Criar</button>
                    </form>
                </div>
            </div>
        </>
    )
}