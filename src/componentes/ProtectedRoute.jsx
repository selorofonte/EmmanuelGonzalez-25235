
import React from 'react';
import { Navigate } from 'react-router-dom';
 import { useAuthContext } from '../context/AuthContext';
function ProtectedRoute({ children, soloAdmin = false, soloUser = false }) {


  const { estaLogueado, permiso} = useAuthContext();

// Redireccion a login
  if (!estaLogueado) {
    return <Navigate to="/ingresa" />;
  }
// Redireccion en base a permisos (admin)
  if(soloAdmin && permiso !== "admin")
    {
    alert("Debe ser un administrador para realizar esta accion.");
    return <Navigate to="/productos" />;
  }
// Redireccion en base a perminos (cliente)
  if(soloUser && permiso !== "user")
    {
    alert("Debe ser un cliente para realizar esta accion.");
    return <Navigate to="/administracion" />;
  }
// 
  return children;
}

export default ProtectedRoute;