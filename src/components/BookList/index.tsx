import semImagem from '../../assets/semImagem.png';
import { useContext } from 'react';
import { CatalogContext } from '../../context/CatalogContext';

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
        const volumeInfo = book.volumeInfo;
        return (
          <section key={index}>
            <div className="image">
              <img src={volumeInfo.imageLinks?.thumbnail ? volumeInfo.imageLinks?.thumbnail : semImagem } alt={volumeInfo.title} />
              <button onClick={() => handleAddBook({
                title: volumeInfo.title,
                authors: volumeInfo.authors,
                publisher: volumeInfo.publisher,
                publishedDate: volumeInfo.publishedDate,
                pageCount: volumeInfo.pageCount,
                industryIdentifiers: volumeInfo.industryIdentifiers,
                description: volumeInfo.description,
                imageLinks: {
                  thumbnail: volumeInfo.imageLinks?.thumbnail
                }
              })}
                className="btn-yellow">
                Adicionar
              </button>
            </div>
            <div className="info">
              <h2>{volumeInfo.title}</h2>
              <p>By {volumeInfo.authors?.join(', ')} &nbsp; Editora {volumeInfo.publisher ? volumeInfo.publisher : 'Não registrada'}</p>
              <b>{volumeInfo.publishedDate}</b> <span>Páginas: {volumeInfo.pageCount ? volumeInfo.pageCount : 'Não registrado' }</span>
              <p>ISBN:&nbsp; {volumeInfo.industryIdentifiers?.map(identifier => identifier.identifier).join(', ')}</p>
              <p>{volumeInfo.description}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}