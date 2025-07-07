import { Navigate, useLocation } from 'react-router-dom'

export const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem("accessToken")
    const location = useLocation();

    if (location.pathname === "/login" && token) {
      // Ako je na login strani, a ima token, preusmeri na /products
      return <Navigate to="/products" replace />;
    }

    if(!token){
        return <Navigate to ="/login"/>
    }

    return children
}
