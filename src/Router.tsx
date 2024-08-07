import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { DefaultLayout } from './Layout/DefaultLayout.tsx'
import { Library } from './pages/Library/index.tsx';
import { AddCatalog } from './pages/Library/AddCatalog/index.tsx';
import { AddBook } from './pages/Library/AddBook/index.tsx';
import { Dashboards } from './pages/Library/Dashboards/index.tsx';
import { Header } from './components/header/index.tsx';
import { Book } from './pages/Library/Book/index.tsx';
import { CalculateTime } from './pages/CalculateTime/index.tsx'; 

export function Router() {
  const location = useLocation();
  const showAside = location.pathname.startsWith('/library');

  return (
    <div className='app'>
      {showAside && <Header />}
      <div  className={`content ${showAside ? 'with-sidebar' : ''}`}>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          <Route element={<DefaultLayout />}>
            <Route path="/library" element={<Library />} />
            <Route path="/library/add-catalog" element={<AddCatalog />} />
            <Route path="/library/add-book" element={<AddBook />} />
            <Route path="/library/dashboards" element={<Dashboards />} />
            <Route path="/library/book/:bookId" element={<Book />} />
            <Route path="/calculate-time/:bookId/:totalPages" element={<CalculateTime />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}