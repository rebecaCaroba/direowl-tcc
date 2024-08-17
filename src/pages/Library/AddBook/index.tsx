import { IoSearch } from "react-icons/io5";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from "axios";
import { useState, useCallback, useEffect, useContext } from "react";
import { BookList } from "../../../components/BookList";
import './style.scss'
import * as z from 'zod'
import { api } from "../../../lib/axios";
import { ModalMessageContext } from "../../../context/ModalMessageContext";

const SearchBookSchema = z.object({
    searchbook: z.string().min(2, { message: "No mínimo 2 caracteres." }).max(50, { message: "Limite de 50 caracteres." }),
    optionCatalog: z.number()
})

type SearchBookInput = z.infer<typeof SearchBookSchema>

interface VolumeInfoType {
    title: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    industryIdentifiers?: { type: string; identifier: string }[];
    description?: string;
    imageLinks?: {
        thumbnail?: string;
    };
}

interface CatalogType {
    id: number,
    name: string,
}

interface BookType {
    volumeInfo: VolumeInfoType;
}

export function AddBook() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitSuccessful },
    } = useForm<SearchBookInput>({
        resolver: zodResolver(SearchBookSchema),
    })
    const [books, setBooks] = useState<BookType[]>([])
    const [catalogs, setCatalogs] = useState<CatalogType[]>([])
    const [optionCatalogSelect, setOptionCatalogSelect] = useState<number>()
    const { ShowModalMessage, TextModalMessage, ErrorModalMessage } = useContext(ModalMessageContext)

    async function getCatalogs() {
        try {
            const token = localStorage.getItem('token')
            const response = await api.get('get-catalog', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCatalogs(response.data.result)
            if (response.data.message) {

                console.log(response.data.message)
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

    const handleSearchBook = useCallback(async (data: SearchBookInput) => {
        setOptionCatalogSelect(data.optionCatalog)
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(data.searchbook)}`

        try {
            const response = await axios.get(url)
            if (response.data.items) {
                setBooks(response.data.items)
            } else {
                alert('Nenhum livro encontrado.')
            }
        } catch (err) {
            console.log(err)
        }
    }, [])

    useEffect(() => {
        getCatalogs()
    }, [])


    return (
        <>
            <div className="addbook-container">
                <h1 className="text-yelow">Adicionar livro</h1>
                <div className="addbook-content">
                    <section>
                        <form className="addbook-form" onSubmit={handleSubmit(handleSearchBook)}>
                            <label htmlFor="catalog">Selecione o catálogo</label>
                            <select {...register('optionCatalog', { valueAsNumber: true })}>
                                {catalogs.map((catalog, index) => {
                                    return (
                                        <option key={index} value={catalog.id}>{catalog.name}</option>
                                    )
                                })}
                            </select>
                            <span className='span-erros'>{errors.optionCatalog?.message}</span>

                            <label htmlFor="searchbook">Pesquise o livro</label>
                            <div className="search-book">
                                <input
                                    type="text"
                                    autoComplete="off"
                                    id="searchbook"
                                    placeholder="Pesquise por nome, autor, ISBN"
                                    {...register("searchbook")}
                                />
                                <IoSearch size={32} />
                                <span className='span-erros'>{errors.searchbook?.message ? errors.searchbook?.message : ''}</span>

                            </div>
                            <button className="btn-yellow" type="submit">Pesquisar</button>
                        </form>
                    </section>
                </div>
                {
                    isSubmitSuccessful ? <BookList books={books} CatalogSelect={optionCatalogSelect} /> : ''
                }

            </div>
        </>
    )
}