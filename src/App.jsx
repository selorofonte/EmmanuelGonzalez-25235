import './App.css';
import Header from './componentes/Header';
import Footer from './componentes/Footer';
import Ingresa from './paginas/Ingresa';
import  Inicio from './paginas/Inicio';
import  Productos from './paginas/Productos';
import ProductoDetalle from './paginas/ProductoDetalle';
import Administracion from './paginas/Administracion.jsx';
import  Carrito from './paginas/Carrito';
import NotFound from './paginas/NotFound.jsx';
import { StrictMode} from 'react';
import { AuthProvider} from './context/AuthContext';
import ProtectedRoute from './componentes/ProtectedRoute.jsx'
import { CarritoProvider } from './context/CarritoContext';
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


function App()  {
  return (
    <>
        <StrictMode>
          <AuthProvider>
            {/* Login */}

          <CarritoProvider> 
          {/* Carrito */}
            <BrowserRouter > 
                  {/* Encabezado*/}
                  <Header/>
                  <div>
                    <Routes>
                      <Route  path="/" element={ <Inicio/>}/>
                      <Route  path="/productos" element={ <Productos/>}/>
                      <Route path="/productos/:id" element={<ProductoDetalle />} /> 
                      <Route  path="/ingresa" element= { <Ingresa/> } />
                      
                      {/* Rutas protegidas */}
                  
                      {/* Condicion de cliente */}
                      <Route  path="/carrito" element={ <ProtectedRoute soloUser={true}>  <Carrito/>  </ProtectedRoute>  }/>
                      {/* Condicion de admin */}
                      <Route  path="/administracion" element={<ProtectedRoute soloAdmin={true}>  <Administracion/> </ProtectedRoute>}/>

                      {/* 404 */}
                      
                      <Route path="/*" element={<NotFound />} /> 

                    </Routes>
                  </div>
                  {/* Pie de pagina */}
                  <Footer/>
              </BrowserRouter>
          </CarritoProvider>
          </AuthProvider>
        </StrictMode>

    </>
  )
}

export default App