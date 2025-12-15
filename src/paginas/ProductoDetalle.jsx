import React from 'react'; 
import {Link, useParams, useLocation, useNavigate} from 'react-router-dom'; 
import {Card, Button} from 'react-bootstrap';

// Contexto para el boton del carrito
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
// Verifica que este logeado
import { useAuthContext } from '../context/AuthContext';


function ProductoDetalle() { 
//Condicion context del carrito
const {agregarCarrito}=useContext( CarritoContext);
//Condicion context del login
const {estaLogueado,permiso}=useAuthContext();

/*Traigo el id*/
const { id } = useParams(); 
/* Traer informacion state product*/
const location =useLocation();
const producto =location.state?.producto; 

/* Ingresa productos */
const navigate = useNavigate();
const habilitarCarrito= ()=>{
       if (estaLogueado && permiso == "user") {
          agregarCarrito({name: producto.name, price: producto.price, id: producto.id, cantidad:1} );
        }
        else {
          alert("Debe estar logueado como usuario");
          navigate('/ingresa');
        }

    }

/* Trae informacion o arroja advertencia*/
if (!producto){
    return(
        <div>
            <p>No se pudo cargar el producto</p>
            <Link to='/productos'>  <Button variant="primary" >Volver a Productos</Button>  </Link>
        </div>
    );
}


return ( 



<div  style={{ display: "flex",  justifyContent: "center"}}> 
    <Card style={{ width: '18rem', margin:'1rem' }}>
            <div style={{ width: '15rem', height: '12rem', margin:'1rem', textAlign:"center" }}>
            <Card.Img variant="top" src={producto.imagen} alt={producto.id} style={{ width: '80%',height:'80%' , objectFit:'contain' }}/>
            </div>
            <Card.Body>
              <Card.Title className='text-center fs-6 fw-bold'>{producto.name}</Card.Title>
              <Card.Text className='text-center fs-6'> {producto.descripcion} </Card.Text>
              <Card.Text className='text-center fs-6 fw-bold'> Precio: ${producto.price} </Card.Text>
              <div className="d-grid gap-3">


                <Link to={`/productos`} className="d-grid">  <Button variant="primary" >Volver a Productos</Button>  </Link>
            
                {/*Al cargar el producto cargo la info necesaria para el carrito*/}
                <Button variant="outline-info" onClick={habilitarCarrito}>Agregar</Button>

              </div>
            </Card.Body>
    </Card>

 


</div> 
); 

} 
export default ProductoDetalle; 