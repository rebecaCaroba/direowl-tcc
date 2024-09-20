import semImagem from '../../assets/semImagem.png';
import { useContext } from 'react';
import { CatalogContext } from '../../context/CatalogContext';

interface VolumeInfoType {
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  pageCount: number;
  industryIdentifiers?: { type: string; identifier: string }[];
  description?: string;
  idResBook: string;
  imageLinks: {
    thumbnail: string;
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
                      authors: volumeInfo.authors || ['Autor não registrado'],
                      publisher: volumeInfo.publisher || 'Editora não registrada',
                      publishedDate: volumeInfo.publishedDate || 'Data não registrada',
                      pageCount: volumeInfo.pageCount,
                      industryIdentifiers: volumeInfo.industryIdentifiers || [{ type: 'ISBN', identifier: 'ISBN Não registrado' }],
                      description: volumeInfo.description || 'Descrição não registrada',
                      imageLinks: {
                        thumbnail: volumeInfo.imageLinks?.thumbnail || semImagem,
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
                    'ISBN Não registrado'}
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