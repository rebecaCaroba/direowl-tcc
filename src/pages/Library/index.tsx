import './style.scss'
import { BookShelves } from "../../components/BookShelves";
import { IoSearch } from 'react-icons/io5';
import { CatalogContext } from '../../context/CatalogContext';
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext.tsx';
import { Link } from 'react-router-dom';

export function Library() {

    const { getCatalogAndBooks, catalogs } = useContext(CatalogContext)
    const { user } = useContext(UserContext)

    useEffect(() => {
        if (user) {
            getCatalogAndBooks()
        }
    }, [user])

    const categories = catalogs.reduce((acc, item) => {
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

    if (!hasCategories) {
        return (
            <div className='no-categories'>
                <h1>Parece que não tem nada aqui, que tal <Link className='text-yellow' to='create-catalog'>criar um catálogo</Link>? </h1>
            </div>
        )
    }

    return (
        <div>
            <header className="library-header">
                <form className="library-searchform">
                    <button type="submit">
                        <IoSearch size={32} />
                    </button>
                    <input type="text" autoComplete="off" name="search" id="search" placeholder="Pesquise por nome, autor, ISBN" />
                </form>
                
            </header>
            <BookShelves categories={categories} />
        </div>
    )
}