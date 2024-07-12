import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import axios from "axios";
import { useMemo, useState, useCallback } from "react";
import { BookList } from "../../../components/BookList";
import './style.scss'
import * as z from 'zod'

const SearchBookSchema = z.object({
    searchbook: z.string().min(2, { message: "No mínimo 2 caracteres." }).max(50, { message: "Limite de 50 caracteres." })
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

interface BookType {
    volumeInfo: VolumeInfoType;
}

export function AddBook() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SearchBookInput>({
        resolver: zodResolver(SearchBookSchema),
    })
    const [books, setBooks] = useState<BookType[]>([])

    const handleSearchBook = useCallback(async (data: SearchBookInput) => {
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(data.searchbook)}`;

        try {
            const response = await axios.get(url);
            if (response.data.items) {
                setBooks(response.data.items);
            } else {
                alert('Nenhum livro encontrado.');
            }
        } catch (err) {
            console.log(err);
        }
    }, []);

    const bookResults = useMemo(() => (
        books.length > 0 ? <BookList books={books} /> : <div className="book-result"><h1>Nenhum resultado encontrado</h1></div>
    ), [books]);

    return (
        <>
          <div className="addbook-container">
            <h1 className="text-yelow">Adicionar livro</h1>
            <div className="addbook-content">
              <nav>
                <ul>
                    <li>
                        <Link to="">Pesquisa</Link>
                    </li>

                    <li>
                        <Link to="">Manual</Link>
                    </li>
                </ul>
              </nav>
              <section>
                <form className="addbook-form" onSubmit={handleSubmit(handleSearchBook)}>
                    <label htmlFor="catalog">Selecione o catálogo</label>
                    <select name="catalog" id="">
                        <option value="Guerra">Guerra</option>
                        <option value="Romance">Romance</option>
                    </select>

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
           {bookResults}
          </div>
        </>
    )
}