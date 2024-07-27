import './style.scss'
import { BookShelves } from "../../components/BookShelves";
import { IoSearch } from 'react-icons/io5';
import { useEffect } from 'react';
import { useContext } from 'react';
import { CatalogContext } from '../../context/CatalogContext';
import { UserContext } from '../../context/UserContext.tsx/';

export function Library() {
    const { getCatalogAndBooks, catalogs } = useContext(CatalogContext)
    const { user } = useContext(UserContext)
    console.log(user)

    useEffect(() => {
        if (user?.id !== undefined) {
            getCatalogAndBooks(user.id);
        }

    }, [])

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
            <BookShelves catalogs={catalogs} />
        </div>
    )
}