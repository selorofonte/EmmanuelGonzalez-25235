import {Card, Button} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';

// Carrito segun context
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
// Condicion si esta logeado
import { useAuthContext } from '../context/AuthContext';

function Tarjeta(producto){

// Sumar item duplicado
const {carrito, agregarCarrito}=useContext( CarritoContext);

// Condicion para gregar al carrito (login)
const {estaLogueado,permiso}=useAuthContext();
/* Ingresar productos */
const navigate = useNavigate();
const habilitarCarrito= ()=>{
      if (estaLogueado && permiso=="user") {
          agregarCarrito({name: producto.name, price: producto.price, id: producto.id, cantidad:1} );
        }
      else if (estaLogueado && permiso=="admin"){
        alert("Debe ser un cliente para realizar esta accion");
      }
      else {
        alert("Debe ser un cliente para realizar esta accion");
        navigate('/ingresa');
      }

    }




    return (
    <Card style={{ width: '18rem', margin:'1rem' }}>
        <div style={{ width: '15rem', height: '12rem', margin:'1rem', textAlign:"center" }}>
        <Card.Img variant="top" src={producto.imagen} alt={producto.id} style={{ width: '80%',height:'80%' , objectFit:'contain' }}/>
        </div>
        <Card.Body>
          <Card.Title className='text-center fs-6 fw-bold'>{producto.name}</Card.Title>
          <Card.Text className='text-center fs-6 fw-bold'> Precio: ${producto.price} </Card.Text>
          <div className="d-grid gap-3">
            <Link to={`/productos/${producto.id}`} state={{producto}} className="d-grid">  <Button variant="primary" >   Detalles  </Button> </Link>
            
            
            {/* Agregar al carrito */}
            <Button variant="primary" onClick={habilitarCarrito}>


              Agregar
              
              </Button>
            
          
          </div>
        </Card.Body>
    </Card>
    )

} 


export default Tarjeta;