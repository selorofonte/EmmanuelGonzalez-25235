import { useContext } from 'react'; 
import { CarritoContext } from '../context/CarritoContext'; 
import { Row,Col, Container, Button, Table} from 'react-bootstrap';


function Carrito() { 

    // Acceso a componentes mediante context
    const { carrito, agregarCarrito, decrementarCarrito,  borrarItemCarrito, vaciarCarrito, totalCompra, totalItems } = useContext(CarritoContext); 
   

    // Mensaje de transaccion completada
    const mensajeCompra= ()=>{
        alert("Compra efectuada con exito");
        vaciarCarrito();
    }



    return ( 
        <div> 
            {/* Estado del carrito */}
            <Container >

                
                {carrito.length > 0 ? (
                    <Container>
                    <h1 style={{ textAlign:"center", marginTop:"2rem", marginBottom:"2rem" }}>Su compra</h1> 
                    <Table striped borderless hover>
                            <thead>
                                <tr>
                                <th style={{ textAlign:"start"}}>Nombre</th>
                                <th style={{ textAlign:"center"}}>Cantidad</th>
                                <th style={{ textAlign:"end"}}>Precio</th>
                                <th style={{ textAlign:"end"}}>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                      {carrito.map(producto => (
                                        <tr key={producto.id}>
                                            <td>{producto.name}</td>                                           
                                            <td><Container style={{ display: "flex", textAlign:"center", width: "10rem"}}>
                                                        <Col> <Button onClick={() => decrementarCarrito ({name: producto.name, price: producto.price, id: producto.id, cantidad: producto.cantidad} )}>- </Button></Col>
                                                        <Col className="text-center"> {producto.cantidad} </Col>
                                                        <Col> <Button onClick={() => agregarCarrito ({name: producto.name, price: producto.price, id: producto.id, cantidad: producto.cantidad} )}> +</Button></Col>
                                                </Container>
                                            </td>
                                            <td style={{ textAlign:"end"}}>${producto.price}</td>
                                            <td style={{ textAlign:"end"}}>${parseFloat(producto.price * producto.cantidad).toFixed(2)}</td>
                                            <td style={{ textAlign:"center"}}><Button  onClick={() =>  borrarItemCarrito ({name: producto.name, price: producto.price, id: producto.id, cantidad: producto.cantidad} )}>X</Button></td>
                                        </tr>
                                      ))}
                            </tbody>
                    </Table>
                    <h2>Total comprado: ${totalCompra.toFixed(2)}</h2>
                    <h2>Cantidad de Items: {totalItems}</h2>
                    </Container>


                
                
                ) : ( <Row >  <h1 style={{ textAlign:"center", marginTop:"2rem", marginBottom:"2rem" }}>Carrito Vacio</h1>   </Row>)}


            
            </Container>  
            {/* Condicion para boton que despeja el carrito */}         
            {carrito.length > 0 && 
                <Container style={{margin:"2rem",textAlign:"center"}}>
                    <Row >
                        <Col>
                        <Button  onClick={vaciarCarrito} variant="primary" size="sm" className='ml-2'>Vaciar Carrito</Button>
                        </Col>
                        <Col>
                        <Button  onClick={mensajeCompra} variant="primary" size="sm" className='ml-2'>Confirmar compra</Button>
                        </Col>
                    </Row>
                </Container>
            } 


        </div> 
    ); 
} 
export default Carrito;
