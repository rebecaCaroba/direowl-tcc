import { Routes, Route } from 'react-router-dom'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { DefaultLayout } from './Layout/DefaultLayout.tsx'

export function Router() {

  return (
    <div className='app'>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
    </div>
  )
}