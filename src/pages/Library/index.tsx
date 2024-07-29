import './style.scss'
import { BookShelves } from "../../components/BookShelves";
import { IoSearch } from 'react-icons/io5';

export function Library() {
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
            <BookShelves />
        </div>
    )
}