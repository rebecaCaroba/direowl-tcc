import './style.scss'
import { BookShelves } from "../../components/BookShelves";
import { IoSearch } from 'react-icons/io5';
import { CatalogContext } from '../../context/CatalogContext';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext/index.tsx';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Gif from '../../assets/corujinhaaaaa .gif'
import * as z from 'zod'

const SearchFormSchema = z.object({
    search: z.string()
})

type SearchInputs = z.infer<typeof SearchFormSchema>

export function Library() {
    const {
        register,
        handleSubmit,
    } = useForm<SearchInputs>({
        resolver: zodResolver(SearchFormSchema),
    })

    const { getCatalogAndBooks, catalogsAndBooks, loading, mes } = useContext(CatalogContext)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            fetchData()
        }
    }, [user])

    async function fetchData() {
        await getCatalogAndBooks()
    }

    async function handleSearchCatalog(data: SearchInputs) {
        const searchValue = data.search.toLowerCase()

        await getCatalogAndBooks(searchValue)
    }

    const categories = catalogsAndBooks.reduce((acc, item) => {
        if (!acc[item.catalog_name]) {
            acc[item.catalog_name] = { catalogId: item.catalog_id, books: [] }
        }
        acc[item.catalog_name].books.push({
            id: item.book_id,
            name: item.catalog_name,
            imageLinks: item.book_image,
            title: item.book_title
        })
        return acc
    }, {} as Record<string, { catalogId: number; books: { id: number; name: string; imageLinks: string; title: string }[] }>)

    return (
        <div>
            <header className="library-header">
                <form onSubmit={handleSubmit(handleSearchCatalog)} className="library-searchform">
                    <button type="submit">
                        <IoSearch size={32} />
                    </button>
                    <input
                        type="text"
                        autoComplete="off"
                        id="search"
                        placeholder="Pesquise por nome, autor, ISBN"
                        {...register('search')}
                    />
                </form>
            </header>
            {loading && (
                <div className='gif-container'>
                    <img src={Gif} width={200} />
                </div>
            )}

            

            {
                Object.keys(categories).length == 0 ? (
                    mes ? (
                        <div className='no-categories'>
                        <h1>{mes}</h1>
                    </div>
                    ) : (
                        <div className='no-categories'>
                        <h1>Parece que não tem nada aqui, que tal <Link className='text-yellow' to='create-catalog'>criar um catálogo</Link>? </h1>
                    </div>
                    )
                ) : (
                    <BookShelves categories={categories} />
                )
            }
        </div>
    )
}