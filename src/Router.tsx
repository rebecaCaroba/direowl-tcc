import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { DefaultLayout } from './Layout/DefaultLayout.tsx'
import { Aside } from './components/Aside/index.tsx';
import { Library } from './pages/Library/index.tsx';
import { AddCatalog } from './pages/Library/AddCatalog/index.tsx';
import { AddBook } from './pages/Library/AddBook/index.tsx';
import { Dashboards } from './pages/Library/Dashboards/index.tsx';

export function Router() {
  const location = useLocation();
  const showAside = location.pathname.startsWith('/library');

  return (
    <div className='app'>
      {showAside && <Aside />}
      <div  className={`content ${showAside ? 'with-sidebar' : ''}`}>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
            <Route path="/library" element={<Library />} />
            <Route path="/library/add-catalog" element={<AddCatalog />} />
            <Route path="/library/add-book" element={<AddBook />} />
            <Route path="/library/dashboards" element={<Dashboards />} />
        </Routes>
      </div>
    </div>
  )
}