import './style.scss'
import { BookShelves } from "../../components/BookShelves";
import { IoSearch } from 'react-icons/io5';
import { CatalogContext } from '../../context/CatalogContext';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext.tsx';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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

    const { getCatalogAndBooks, catalogsAndBooks } = useContext(CatalogContext)
    const { user } = useContext(UserContext)
    const [searchValue, setSearchValue] = useState<string>('show')

    useEffect(() => {
        if (user && searchValue) {
            fetchData()
        }
    }, [user])

    async function fetchData() {
        await getCatalogAndBooks(searchValue)
    }

    function handleSearchCatalog(data: SearchInputs) {
        const searchValue = data.search.toLowerCase()

        setSearchValue(searchValue || 'show')
    }

    const categories = catalogsAndBooks.reduce((acc, item) => {
        if (!acc[item.catalog_name]) {
            acc[item.catalog_name] = { catalogId: item.catalog_id, books: [] }
        }
        acc[item.catalog_name].books.push({
            id: item.book_id,
            name: item.catalog_name,
            imageLinks: item.book_image,
        })
        return acc
    }, {} as Record<string, { catalogId: number; books: { id: number; name: string; imageLinks: string }[] }>)

    const hasCategories = Object.keys(categories).length > 0
    
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
            {!hasCategories ? (
                <div className='no-categories'>
                    <h1>Parece que não tem nada aqui, que tal <Link className='text-yellow' to='create-catalog'>criar um catálogo</Link>? </h1>
                </div>
            ) : (
                <BookShelves categories={categories} />
            )}
        </div>
    )
}