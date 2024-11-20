import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { api } from "../lib/axios";
import { AxiosError } from "axios";
import { TooltipContext } from "./TooltipContext";

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

interface CatalogsAndBooksType {
    book_id: number
    book_image: string
    catalog_id: number
    catalog_name: string
    book_title: string
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
    mes: string
}

export const CatalogContext = createContext({} as CatalogContextType)

export function CatalogContextProvider({
    children
}: CatalogContextProviderProps) {
    const [loading, setLoading] = useState<boolean>(false)
    const [catalogsAndBooks, setCatalogsAndBooks] = useState<CatalogsAndBooksType[]>([])
    const [mes, setMes] = useState<string>('')
    const [catalogs, setCatalogs] = useState<CatalogsType[]>([])
    const { ShowTooltip, TextTooltip, ErrorTooltip } = useContext(TooltipContext)

    async function AddBook({ book, CatalogSelect }: AddBookProps) {
        try {
            const isbn = book.industryIdentifiers?.map((identifier) => identifier.identifier).join(', ') || null

            const response = await api.post('add-book',
                {
                    book: {
                        idResBook: book.idResBook,
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
                }
            )
            if (response.data.message) {
                TextTooltip(response.data.message)
                ShowTooltip(true)
            }

        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            
        }
    }

    async function getCatalogAndBooks(searchValue?: string | undefined) {
        try {
            setLoading(true)
            const response = await api.get('get-catalog-and-books', {
                params: { search: searchValue },
            }
            )

            if(response.data.message) {
                setMes(response.data.message)
            } else  {
                setMes('')
            }

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
            const response = await api.get('/get-catalog')
            setCatalogs(response.data.result)
        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            
        } finally {
            setLoading(false)
        }
    }, [])


    const createCatalog = useCallback( async (catalogName: string) => {
        try {
            setLoading(true)
            const response = await api.post('/create-catalog',
                {
                    nameCatalog: catalogName,
                },
                )

            if (response.data.message) {
                TextTooltip(response.data.message)
                ShowTooltip(true)
            }


        } catch (err) {
            if (err instanceof AxiosError && err?.response?.data?.message) {
                TextTooltip(err.response.data.message)
                ShowTooltip(true)
                ErrorTooltip(err.response.data.error)
                return
            }
            
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
            loading,
            mes
        }}
        >
            {children}
        </CatalogContext.Provider>
    )
}