import { useContext } from 'react';
import { CatalogContext } from '../../context/CatalogContext';
import semImagem from '../../assets/semImagem.png'

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

interface BookType {
  id: string
  volumeInfo: VolumeInfoType;
}

interface BookListProps {
  books: BookType[];
  CatalogSelect: number | undefined
}

export function BookList({ books, CatalogSelect }: BookListProps) {
  const { AddBook } = useContext(CatalogContext)

  async function handleAddBook(book: VolumeInfoType) {
    await AddBook({book, CatalogSelect})
  }

  return (
    <div className="book-result">
      <h1>Resultados</h1>
      {books.map((book, index) => {
          const volumeInfo = book.volumeInfo || {};
          const idResBook = book.id;
  
          if (!volumeInfo.pageCount) {
            return null;
          }
  
          return (
            <section key={index}>
              <div className="image">
                <img
                  src={volumeInfo.imageLinks?.thumbnail || semImagem}
                  alt={volumeInfo.title}
                />
                <button
                  onClick={() =>
                    handleAddBook({
                      idResBook,
                      title: volumeInfo.title,
                      authors: volumeInfo.authors || null,
                      publisher: volumeInfo.publisher || null,
                      publishedDate: volumeInfo.publishedDate || null,
                      pageCount: volumeInfo.pageCount,
                      industryIdentifiers: volumeInfo.industryIdentifiers || null,
                      description: volumeInfo.description ||  null,
                      imageLinks: {
                        thumbnail: volumeInfo.imageLinks?.thumbnail || null,
                      },
                    })
                  }
                  className="btn-yellow"
                >
                  Adicionar
                </button>
              </div>
              <div className="info">
                <h2>{volumeInfo.title}</h2>
                <p>
                  By {volumeInfo.authors?.join(', ') || 'Autor não registrado'} &nbsp; Editora{' '}
                  {volumeInfo.publisher || 'Não registrada'}
                </p>
                <b>{volumeInfo.publishedDate || 'Data não registrada'}</b> <span>Páginas: {volumeInfo.pageCount}</span>
                <p>
                  ISBN:&nbsp;{' '}
                  {volumeInfo.industryIdentifiers?.map((identifier) => identifier.identifier).join(', ') ||
                    'Não registrado'}
                </p>
                <p>{volumeInfo.description || 'Descrição não registrada'}</p>
              </div>
            </section>
          );
        })
    }
    </div>
  )
}