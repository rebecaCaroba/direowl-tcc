import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useCallback, useEffect, useContext } from "react";
import { BookList } from "../../../components/BookList";
import { CatalogContext } from '../../../context/CatalogContext'
import { Link } from "react-router-dom";
import './style.scss'
import * as z from 'zod'
import axios from "axios";
import  Gif  from '../../../assets/corujinhaaaaa .gif'
import { Spinner } from "../../../components/Spinner";

const SearchBookSchema = z.object({
    searchbook: z.string().min(2, { message: "No mínimo 2 caracteres." }).max(50, { message: "Limite de 50 caracteres." }),
    optionCatalog: z.number()
})

type SearchBookInput = z.infer<typeof SearchBookSchema>

interface VolumeInfoType {
    title: string;
    authors: string[] | null;
    publisher: string | null;
    publishedDate: string | null;
    pageCount: number;
    industryIdentifiers: { type: string; identifier: string }[] | null;
    description: string | null;
    idResBook: string;
    imageLinks: {
      thumbnail: string | null;
    };
  }

interface BookType {
    id: string
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
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [optionCatalogSelect, setOptionCatalogSelect] = useState<number>()
    const { getCatalogs, catalogs, loading } = useContext(CatalogContext)

    const handleSearchBook = useCallback(async (data: SearchBookInput) => {

        setOptionCatalogSelect(data.optionCatalog)
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(data.searchbook)}`

        try {
            setIsLoading(true)
            const response = await axios.get(url)
            if (response.data.items) {

                setBooks(response.data.items)
            } else {
                alert('Nenhum livro encontrado.')
            }
        } catch (err) {
            alert(err)
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        async function fetchData() {
            await getCatalogs()
        }

        fetchData()
    }, [])


    function handleSelectCatalog() {
        setBooks([])
    }

    if (loading) {
        return <div className='gif-container'> <img src={Gif} width={200} /></div>
    } else {
        if (catalogs.length == 0) {
            return <h1><Link to='/library/create-catalog' className="text-yellow">Crie um catálogo</Link> antes de adicionar um livro</h1> 
        }
    }

        return (
            <>
                <div className="addbook-container">
                    <h1 className="text-yelow">Adicionar livro</h1>
                    <div className="addbook-content">
                        <section>
                            <form className="addbook-form" onSubmit={handleSubmit(handleSearchBook)}>
                                <label htmlFor="catalog">Selecione o catálogo</label>
                                <select {...register('optionCatalog', { valueAsNumber: true })} onChange={handleSelectCatalog}>
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
                                    <span className='span-erros'>{errors.searchbook?.message ? errors.searchbook?.message : ''}</span>

                                </div>
                                <button className="btn-yellow" disabled={isLoading} type="submit">
                                    {isLoading ?
                                        (
                                            <>Pesquisando <Spinner /></>
                                        )
                                        :
                                        'Pesquisar'}
                                </button>
                            </form>
                        </section>
                    </div>
                    {
                        books.length > 0 && isSubmitSuccessful ? <BookList books={books} CatalogSelect={optionCatalogSelect} /> : ''
                    }
                </div>
            </>
        )
    }