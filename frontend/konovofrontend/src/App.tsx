import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/loginPage/Login'
import { Product } from './pages/productPage/Product'
import { Products } from './pages/productsPage/Products'
import { ErrorBoundary } from 'react-error-boundary'
import { ProtectedRoute } from './ProtectedRoute'
import { useToastProvider } from './ToastProvider'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            fontSize: '16px',
          },
        }}
      />
      <ErrorBoundary fallback={
        <div className='errorWrapper'>
          <div className="error">Doslo je do sistemske greske, kontaktirajte developere</div>
          <img className= "errorLogo" src="/konovoLogo.png" alt=""/>
        </div>

        }>
        <Routes>
          <Route path = "/login" element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute> 
            } />
          <Route path = "/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />

          <Route path ="/product/:id" element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          } />
           <Route path="/" element={<Navigate to="/products" replace />} />
           <Route path="*" element={<Navigate to="/products" replace />} />

        </Routes>
      </ErrorBoundary>
    </>
  )
}

export default App
