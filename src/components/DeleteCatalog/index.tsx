import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect } from 'react'
import * as z from 'zod'
import './style.scss'
import { CatalogContext } from '../../context/CatalogContext'

const DeleteCatalogSchema = z.object({
    optionCatalog: z.number()
})

type DeleteCatalogInput = z.infer<typeof DeleteCatalogSchema>


export function DeleteCatalog() {
    const { getCatalogs, catalogs } = useContext(CatalogContext)
    const {
        register,
        handleSubmit,
    } = useForm<DeleteCatalogInput>({
        resolver: zodResolver(DeleteCatalogSchema),
    })

    useEffect(() => {
        async function fetchData() {
            await getCatalogs()
        }

        fetchData()
    }, [])

    async function handleDeleteCatalog(data: DeleteCatalogInput) {
        console.log(data)
    }

    console.log('add', catalogs)

    return (
        <form onSubmit={handleSubmit(handleDeleteCatalog)} className='cont delete-catalog' id='profile-password'>
            <section className='inputs'>
                <div>
                    <label htmlFor="catalog">Selecione o catálogo</label>
                    <select {...register('optionCatalog', { valueAsNumber: true })} >
                        {catalogs.map((catalog, index) => {
                            return (
                                <option key={index} value={catalog.id}>{catalog.name}</option>
                            )
                        })}
                    </select>
                </div>


                <button type='submit' className="btn-deletar">Deletar catálogo</button>
            </section>
            <br />
        </form>
    )
}