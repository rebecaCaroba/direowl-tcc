import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useContext, useEffect } from 'react'
import * as z from 'zod'
import './style.scss'
import { CatalogContext } from '../../context/CatalogContext'
import { TooltipContext } from '../../context/TooltipContext'
import { AxiosError } from 'axios'
import { api } from '../../lib/axios'
import { NotificationModalContext } from '../../context/NotificationModalContext'

const DeleteCatalogSchema = z.object({
    optionCatalog: z.number()
})

type DeleteCatalogInput = z.infer<typeof DeleteCatalogSchema>


export function DeleteCatalog() {
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const { getCatalogs, catalogs } = useContext(CatalogContext)
    const {
        register,
        handleSubmit,
    } = useForm<DeleteCatalogInput>({
        resolver: zodResolver(DeleteCatalogSchema),
    })
    const { messageModal, showModal } = useContext(NotificationModalContext)

    useEffect(() => {
        async function fetchData() {
            await getCatalogs()
        }

        fetchData()
    }, [])

    const handleDeleteCatalog = useCallback( async (data: DeleteCatalogInput) => {
        try {
            const response = await api.delete(`/delete-catalog/${data.optionCatalog}`)

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
    }, [])

    function confirmDelete(data: DeleteCatalogInput) {
        messageModal('Você tem certeza que deseja deletar o catálogo? Todos os livros e cronogramas deste catálogo serão deletados.')
        showModal(() => handleDeleteCatalog(data))
    }
    
    return (
        <form onSubmit={handleSubmit(confirmDelete)} className='cont delete-catalog' id='profile-password'>
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