// Esta sera la galeria con todos mis productos

import React from 'react';
import Tarjeta from '../componentes/Tarjeta';
import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';



function Galeria(){

//Variable a JSON con los datos de los productos
    const [productos, setProductos] = useState([]);

    const [cargando, setCargando] = useState(true); 
    const [error, setError] = useState(null); 


    
    useEffect(()=>{
        fetch("https://693fa7e712c964ee6b709e36.mockapi.io/Tienda/TiendaOnLine")
        .then((response)=>response.json())
        .then((data)=>{
                        setProductos(data);
                        setCargando(false);
        })

         .catch((error) => { 
              setError('Hubo un problema al cargar los productos.'); 
              setCargando(false); 
          }); 

    },[])

    if (cargando) return <p>Cargando productos...</p>; 
    if (error) return <p>{error}</p>; 

            return(
                <>
                    <h4 className='text-center mt-5'>Catalogo</h4> 
                    <Container style={{ display:'flex',flexWrap: 'wrap', marginBottom:'2rem', justifyContent:"center" }}>
                        {
                            productos.map(producto => 
                            <div key = {producto.id}>
                                <Tarjeta name= {producto.name} imagen = {producto.imagen} descripcion = {producto.descripcion} id = {producto.id} price ={producto.price }/>
                            </div>) 
                        }
                    </Container>
                </>
            ) 


}

export default Galeria;
