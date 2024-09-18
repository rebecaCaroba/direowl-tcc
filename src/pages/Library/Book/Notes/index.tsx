import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import * as z from 'zod'
import './style.scss'
import { api } from '../../../../lib/axios'
import { AxiosError } from 'axios'
import { TooltipContext } from '../../../../context/TooltipContext'

interface NoteType {
    id: number
    book_id: number
    text: string
    created_at: Date
}

const AddNotesSchema = z.object({
    text: z.string().min(2, { message: "A nota deve ter no mínimo 2 caracteres." }).max(255, { message: "Limite de 255 caracteres" })
})

type AddNotestInputs = z.infer<typeof AddNotesSchema>

export function Notes() {
    const { bookId } = useParams()
    const [notes, setNotes] = useState<NoteType[]>([])
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<AddNotestInputs>({
        resolver: zodResolver(AddNotesSchema),
    })

    useEffect(() => {
        if (bookId) {
            getNotes(bookId)
        }
    }, [bookId])

    async function getNotes(bookId: string | undefined) {
        try {
            const response = await api.get(`/get-notes/${bookId}`)
            setNotes(response.data.result)
        } catch (err) {
            if (err instanceof AxiosError && err.response?.data?.message) {
                console.error(err.response.data.message)
            }
            console.error(err)
        }
    }

    async function handleDeleteNote(notesId: number) {
        try {
            const response = await api.delete(`/delete-notes/${notesId}`)
            await getNotes(bookId)

            TextTooltip(response.data.message)
            ShowTooltip(true)
        } catch (err) {
            if (err instanceof AxiosError && err.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            console.error(err)
        }
    }

    async function handleAddNote(data: AddNotestInputs) {
        try {
            const response = await api.post(`/add-notes`, {
                text: data.text,
                bookId: Number(bookId)
            })
            
            TextTooltip(response.data.message)
            ShowTooltip(true)

            await getNotes(bookId)
        } catch (err) {
            if (err instanceof AxiosError && err.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            console.error(err)
        }
    }

    return (
        <div className="Notes">
            <div className="title">
                <h1>Notas</h1>
            </div>
            <section>
                <form onSubmit={handleSubmit(handleAddNote)}>
                    <textarea id="note" {...register('text')}></textarea>
                    <span className='span-erros'>{errors.text?.message ? errors.text?.message : ' '}</span>
                    <button disabled={isSubmitting} type="submit" className='btn-yellow' >Adicionar</button>
                </form>
                <div className="notes-container">
                    {notes &&
                        notes.map((note, index) => (
                            <div className="notes-content" key={index}>
                                <div>
                                    <data value={new Date(note.created_at).toISOString()}>
                                        {new Date(note.created_at).toLocaleDateString()}
                                    </data>
                                    <button onClick={() => handleDeleteNote(note.id)}>x</button>
                                </div>
                                <p>
                                    {note.text}
                                </p>
                            </div>
                        ))
                    }
                </div>


            </section>
        </div>
    )
}