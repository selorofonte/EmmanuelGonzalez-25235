import React from 'react';
import logo from '../imagenes/LogoMarca.png';
import { Link, useNavigate} from 'react-router-dom';
import { Container,Nav,Navbar} from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
import { useContext } from 'react'; 
import { CarritoContext } from '../context/CarritoContext'; 

import "bootstrap-icons/font/bootstrap-icons.css";




function Header() {
  const { estaLogueado, logout, permiso} = useAuthContext();
  const { totalItems, vaciarCarrito } = useContext(CarritoContext); 
  const navigate = useNavigate();

  const cerrarSesion = () => {
    // Al cerrar la sesion lo mando a la pagina de inicio
    navigate("/");
    // No importa con que permiso este logueado. Siempre borra el carrito
    vaciarCarrito();
    // Sale de la sesion
    logout();
  };

  
  
  return (
    <Navbar bg='myBackground' variant='light' sticky='top' expand='lg'>
      <Container>
            <Navbar.Brand as={Link} to="/">
              {/* Cargo la imagen y el texto del comercio */}
              <img className='milogo' src={logo} alt="Logo" />
                CandyTech
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">

                <Nav  className="ms-auto" >
                
                  {/* Nav.Link usa el Link de react-router-dom. */}
                  <Nav.Link as={Link} to="/" style={{margin:"auto"}}>Inicio</Nav.Link>
                  <Nav.Link as={Link} to="/productos"  style={{margin:"auto"}}>Productos</Nav.Link>
                  <Nav.Link as={Link} to="/administracion" style={{margin:"auto"}} >Gestion</Nav.Link>
                  <Nav.Link as={Link} to="/carrito" style={{fontSize:"1.5rem", color:"black",  margin:"auto"}}>
                  {/* Muestra el total del carrito */}
                   <i className="bi bi-cart4"> { (estaLogueado && permiso === "user" )? totalItems : ' ' } </i>                 
                  </Nav.Link>
                  {/* Cambiar entre login y logout */}
                  { (estaLogueado) ? (<div  style={{margin:"auto"}}>
                    <button onClick={cerrarSesion} className="btn btn-outline-dark btn-sm">  Log out </button>
                    </div>): (<div style={{margin:"auto"}} >
                    <button onClick= { ()=>{navigate('/ingresa')} } className="btn btn-outline-dark btn-sm" > Log in</button> </div>)
                  }
                
                </Nav>

            </Navbar.Collapse> 
      </Container>
    </Navbar>
  );
}

export default Header;