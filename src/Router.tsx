import { Routes, Route, useLocation } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { DefaultLayout } from './Layout/DefaultLayout.tsx'
import { Aside } from './components/Aside/index.tsx';
import { Library } from './pages/Library/index.tsx';

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
            <Route path="/library" element={<Library />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}