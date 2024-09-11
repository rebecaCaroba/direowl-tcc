import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { ModalMessageContext } from "./ModalMessageContext";

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

interface CatalogsAndBooksType {
    book_id: number
    book_image: string
    catalog_id: number
    catalog_name: string
}


interface CatalogsType {
    id: number,
    name: string,
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
    getCatalogAndBooks: (searchValue?: string) => Promise<void>
    getCatalogs: () => Promise<void>
    createCatalog: (catalogName: string ) => Promise<void>
    catalogsAndBooks: CatalogsAndBooksType[]
    catalogs: CatalogsType[]
    loading: boolean
}

export const CatalogContext = createContext({} as CatalogContextType)

export function CatalogContextProvider({
    children
}: CatalogContextProviderProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [catalogsAndBooks, setCatalogsAndBooks] = useState<CatalogsAndBooksType[]>([])
    const [catalogs, setCatalogs] = useState<CatalogsType[]>([])
    const { ShowModalMessage, TextModalMessage, ErrorModalMessage } = useContext(ModalMessageContext)

    async function AddBook({ book, CatalogSelect }: AddBookProps) {
        try {
            const token = localStorage.getItem('token')
            const isbn = book.industryIdentifiers?.[0]?.identifier || 'ISBN não disponível'

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
                        isbn,
                    },
                    CatalogSelect
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            if (response.data.message) {
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

    async function getCatalogAndBooks(searchValue?: string | undefined) {
        const token = localStorage.getItem('token')

        try {
            setLoading(true)
            const response = await api.get('get-catalog-and-books', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: { search: searchValue },
            }
            )
            setCatalogsAndBooks(response.data.result)
        } catch (err) {
            if (err instanceof AxiosError && err.response?.data?.message) {
                console.error(err.response.data.message)
            }
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const getCatalogs = useCallback(async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem('token')
            const response = await api.get('get-catalog', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCatalogs(response.data.result)
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextModalMessage(err.response.data.message)
                ShowModalMessage(true)
                ErrorModalMessage(err.response.data.error)
                return
            }
            console.log(err)
        } finally {
            setLoading(false)
        }
    }, [])


    const createCatalog = useCallback( async (catalogName: string) => {
        try {
            setLoading(true)
            const idUser = localStorage.getItem('id')
            const token = localStorage.getItem('token')

            const response = await api.post('/create-catalog',
                {
                    idUser: idUser,
                    nameCatalog: catalogName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (response.data.message) {
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
        } finally {
            setLoading(false)
        }
    },[])

    return (
        <CatalogContext.Provider value={{
            AddBook,
            getCatalogAndBooks,
            getCatalogs,
            createCatalog,
            catalogsAndBooks,
            catalogs,
            loading
        }}
        >
            {children}
        </CatalogContext.Provider>
    )
}