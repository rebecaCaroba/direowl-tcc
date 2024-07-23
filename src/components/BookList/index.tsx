import { AxiosError } from 'axios';
import semImagem from '../../assets/semImagem.png';
import { api } from '../../lib/axios';

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
    async function handleAddBook(book: VolumeInfoType) {
      try {
        const token = localStorage.getItem('token')
        const isbn10 = book.industryIdentifiers?.find(id => id.type === 'ISBN_10')?.identifier || ''
        const isbn13 = book.industryIdentifiers?.find(id => id.type === 'ISBN_13')?.identifier || ''
  
        const response = await api.post('add-book',
          {
            book :{
            title: book.title,
            authors: book.authors,
            publisher: book.publisher,
            publishedDate: book.publishedDate,
            pages: book.pageCount,
            description: book.description,
            imageLink: book.imageLinks?.thumbnail,
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
  
        alert(response.data)
      } catch (err) {
        if (err instanceof AxiosError && err?.response?.data?.message) {
          alert(err.response.data.message)
          return
      }
      console.log(err)
      }
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


// import { AxiosError } from 'axios';
// import semImagem from '../../assets/semImagem.png';
// import { api } from '../../lib/axios';

// interface VolumeInfoType {
//   title: string
//   authors?: string[]
//   publisher?: string
//   publishedDate?: string
//   pageCount?: number
//   industryIdentifiers?: { type: string; identifier: string }[]
//   description?: string
//   imageLinks?: {
//     thumbnail?: string
//   }
// }

// interface BookListProps {
//   books: VolumeInfoType[]
//   CatalogSelect: number | undefined
// }

// export function BookList({ books, CatalogSelect }: BookListProps) {

//   console.log(CatalogSelect)
//   async function handleAddBook(book: VolumeInfoType) {
//     try {
//       const token = localStorage.getItem('token')

//       const response = await api.post('add-book',
//         {
//           book
//         }, 
//         {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       }
//       )

//       console.log(response)
//     } catch (err) {
//       if (err instanceof AxiosError && err?.response?.data?.message) {
//         alert(err.response.data.message)
//         return
//     }
//     console.log(err)
//     }
//   }

//   return (
//     <div className="book-result">
//       <h1>Resultados</h1>
//       {books.map((book, index) => {
//         return (
//           <section key={index}>
//             <div className="image">
//               <img src={book.imageLinks?.thumbnail ? book.imageLinks?.thumbnail : semImagem} alt={book.title} />
//               <button onClick={() => handleAddBook({
//                 title: book.title,
//                 authors: book.authors,
//                 publisher: book.publisher,
//                 publishedDate: book.publishedDate,
//                 pageCount: book.pageCount,
//                 industryIdentifiers: book.industryIdentifiers,
//                 description: book.description,
//                 imageLinks: {
//                   thumbnail: book.imageLinks?.thumbnail
//                 }
//               })}
//                 className="btn-yellow">
//                 Adicionar
//               </button>
//             </div>
//             <div className="info">
//               <h2>{book.title}</h2>
//               <p>By {book.authors?.join(', ')} &nbsp; Editora {book.publisher ? book.publisher : 'Não registrada'}</p>
//               <b>{book.publishedDate}</b> <span>Páginas: {book.pageCount ? book.pageCount : 'Não registrado'}</span>
//               <p>ISBN:&nbsp; {book.industryIdentifiers?.map(identifier => identifier.identifier).join(', ')}</p>
//               <p>{book.description}</p>
//             </div>
//           </section>
//         );
//       })}
//     </div>
//   );
// }
