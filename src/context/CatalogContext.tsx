import { createContext, ReactNode, useState } from "react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";

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
    }
}

interface CatalogType {
    id: number
    name: string
    imageLinks: string
}

interface AddBookProps {
    book: VolumeInfoType
    CatalogSelect: number | undefined
}

interface CatalogContextProviderProps {
    children: ReactNode
}

interface CatalogContextType {
    AddBook: ({ book, CatalogSelect }: AddBookProps) => Promise<void>
    getCatalogAndBooks: () => Promise<void>
    catalogs: CatalogType[]
    isAddBook: boolean
}

export const CatalogContext = createContext({} as CatalogContextType)

export function CatalogContextProvider({
    children
}: CatalogContextProviderProps) {
    const [ isAddBook, setIsAddBook ] = useState<boolean>(false)
    const [ catalogs, setCatalogs ] = useState<CatalogType[]>([])

    async function AddBook({ book, CatalogSelect }: AddBookProps) {
        try {
            const token = localStorage.getItem('token')
            const isbn10 = book.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || ''
            const isbn13 = book.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || ''

            const response = await api.post('add-book',
                {
                    book: {
                        title: book.title,
                        authors: book.authors,
                        publisher: book.publisher,
                        publishedDate: book.publishedDate,
                        pages: book.pageCount,
                        description: book.description,
                        imageLinks: book.imageLinks?.thumbnail,
                        isbn10,
                        isbn13,
                    },
                    CatalogSelect
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            response ? setIsAddBook(true) : setIsAddBook(false)            
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                alert(err.response.data.message)
                return
            }
            console.log(err)
        }
    }

    async function getCatalogAndBooks() {
        try {
            const response = await api.get('get-catalog-and-books')
            setCatalogs(response.data.result)
        } catch (err) {
            if (err instanceof AxiosError && err.response?.data?.message) {
                console.error(err.response.data.message)
            } else {
                console.error(err)
            }
        }
    }

    return (
        <CatalogContext.Provider value={{
            AddBook,
            getCatalogAndBooks,
            catalogs,
            isAddBook
        }}
        >
            {children}
        </CatalogContext.Provider>
    )
}