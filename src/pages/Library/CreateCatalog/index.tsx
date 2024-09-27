import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CatalogContext } from '../../../context/CatalogContext'
import * as z from 'zod'
import './style.scss'
import { Spinner } from '../../../components/Spinner'

const CreateCatalogSchema = z.object({
    nameCatalog: z.string().min(2, { message: "O nome do catálogo deve ter no mínimo 2 caracteres." }).max(40, { message: "Limite de 40 caracteres." })
})

type CreateCatalogtInputs = z.infer<typeof CreateCatalogSchema>

export function CreateCatalog() {
    const { createCatalog } = useContext(CatalogContext)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<CreateCatalogtInputs>({
        resolver: zodResolver(CreateCatalogSchema),
    })

    async function handleCreateCatalog(data: CreateCatalogtInputs) {
        const nameCatalog = data.nameCatalog

        await createCatalog(nameCatalog)

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
                            max={40}
                            id="addCatalog"
                            placeholder='Meus livros, Romance, Comédia, Desejos...'
                            {...register('nameCatalog')}
                        />
                        <span className='span-erros'>{errors.nameCatalog?.message ? errors.nameCatalog?.message : ' '}</span>
                        <button className='btn-yellow' disabled={isSubmitting} type="submit">
                            
                            {isSubmitting ? (
                                <>Criando {<Spinner />}</>
                            ): (
                                <>Criar</>
                            )}
                            </button>
                    </form>
                </div>
            </div>
        </>
    )
}