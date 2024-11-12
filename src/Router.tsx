import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { DefaultLayout } from './Layout/DefaultLayout.tsx'
import { Library } from './pages/Library/index.tsx';
import { CreateCatalog } from './pages/Library/CreateCatalog/index.tsx';
import { AddBook } from './pages/Library/AddBook/index.tsx';
import { Profile } from './pages/Library/Profile/index.tsx';
import { Header } from './components/header/index.tsx';
import { Book } from './pages/Library/Book/index.tsx';
import { CalculateTime } from './pages/CalculateTime/index.tsx'; 
import { Catalog } from './pages/Library/Catalog/index.tsx';
import { Notes } from './pages/Library/Book/Notes/index.tsx';
import { GlobalLayout } from './Layout/GlobalLayout.tsx';

export function Router() {
  const location = useLocation();
  const showAside = location.pathname.startsWith('/library');

  return (
    <div className='app'>
      {showAside && <Header />}
      <div  className={`content ${showAside ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<GlobalLayout />}>
              <Route path="/library" element={<Library />} />
              <Route path="/library/create-catalog" element={<CreateCatalog />} />
              <Route path="/library/add-book" element={<AddBook />} />
              <Route path="/library/profile" element={<Profile />} />
              <Route path="/library/book/:bookId" element={<Book />} />
              <Route path='/library/book/notes/:bookId' element={<Notes />} />
              <Route path="/library/catalog/:catalogId" element={<Catalog />} />
              <Route path="/calculate-time/:bookId/:totalPages" element={<CalculateTime />} />
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  )
}