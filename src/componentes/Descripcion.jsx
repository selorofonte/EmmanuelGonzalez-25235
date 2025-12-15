import TarjetaPresentacion from "./TarjetaPresentacion";



function Descripcion(){
    return(
        <div>
            <main className='my-viewport-height p-5 '> 
                
            </main>

            <h4 className='text-center mb-3'>Endulza tu vida</h4> 
            
            <div   style={{ display:'flex',flexWrap: 'wrap', marginBottom:'2rem', paddingLeft:'2rem', justifyContent:"center" }}>
                <TarjetaPresentacion titulo= {"Manejamos todos los medios de pago"} descripcion = {"Si no tenemos el medio de pago que buscas es porque no existe."}/>
                <TarjetaPresentacion titulo= {"Compras a medida"} descripcion = {"Somos sinonimo de calidad de atencion."}/>
             
            </div>
         </div>
    )
}

export default Descripcion;
