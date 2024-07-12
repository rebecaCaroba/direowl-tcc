import semImagem from '../../assets/semImagem.png';

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
}

export function BookList({ books }: BookListProps) {
  return (
    <div className="book-result">
      <h1>Resultados</h1>
      {books.map((book, index) => {
        const volumeInfo = book.volumeInfo;
        return (
          <section key={index}>
            <div className="image">
              <img src={volumeInfo.imageLinks?.thumbnail ? volumeInfo.imageLinks?.thumbnail : semImagem } alt={volumeInfo.title} />
              <button className="btn-yellow">Adicionar</button>
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
