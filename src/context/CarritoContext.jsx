import React, { createContext, useState } from 'react'; 

// Crea el contexto
export const CarritoContext = createContext(); 
// Usa proveedor de contexto como condicion para acceso a informacion 
export function CarritoProvider({ children }) 

{ 
    // Se crea el carrito 
    const [carrito, setCarrito] = useState([]); 
    // Alta baja y modificacion
    const agregarCarrito = (producto) => { 
        // Me fijo si el item ya existe en el carrito 
        const encontroItem = carrito.find((item)=> item.id === producto.id); 
        if(!encontroItem){
             setCarrito([...carrito, producto])    ;
              }
        else{
            setCarrito(carrito.map((item)=> (item.id ===producto.id ?   { ...producto, cantidad: encontroItem.cantidad + 1}    :    item  )))    ;
        }
        }; 

    // Resta la cantidad a un producto especificado
      const decrementarCarrito = (producto) => { 
        // Busca item en carrito
        const encontroItem = carrito.find((item)=> item.id === producto.id); 
        if(encontroItem.cantidad !== 1){
            setCarrito(carrito.map((item)=> (item.id ===producto.id ?   { ...producto, cantidad: encontroItem.cantidad -  1}    :    item  )))    ;
        }
        }; 

    // Borro un item 
      const borrarItemCarrito= (producto) => { 
        // Busca item en carrito
        const encontroItem = carrito.find((item)=> item.id === producto.id); 
        // En caso de encontrarlo lo borra
        if(encontroItem !== 1){
            // Actualiza el carrito
            const nuevoCarrito = carrito.filter((item) => item !== encontroItem)
            setCarrito(nuevoCarrito)  ;
        }
        }; 


    const vaciarCarrito = () => { setCarrito([]); };
    
    // Calcula Total 
    const totalCompra = carrito.reduce((acumulador,elemento) => acumulador+ parseFloat(elemento.price)*parseInt(elemento.cantidad), 0);
    // Cuenta los items en el carrito
    const totalItems = carrito.reduce((acumulador,elemento) => acumulador+ parseInt(elemento.cantidad), 0);


    const valor={ carrito, agregarCarrito, decrementarCarrito,  borrarItemCarrito, vaciarCarrito, totalCompra, totalItems };
    
    return ( 
        // Brinda acceso a los componentes 
            <CarritoContext.Provider value={valor}>
                {children} 
            </CarritoContext.Provider> 
        ); 

}