import { IoPersonCircle, IoSearch } from "react-icons/io5";
import './style.scss'
import { Link } from "react-router-dom";
import { BookShelves } from "../../components/BookShelves";

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
                <div className="library-user">
                    <Link to="/"><IoPersonCircle size={42} /></Link>
                    <p>Lisa Simpson</p>
                </div>
            </header>
            <BookShelves />
        </div>
    )
}