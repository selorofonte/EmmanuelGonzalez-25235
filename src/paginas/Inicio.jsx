import Descripcion from '../componentes/Descripcion';
import 'bootstrap/dist/css/bootstrap.min.css';

function Inicio(){
    return (
        <div>

        <div
            style={{
                    backgroundImage: "url('/imagenes/fondo.jpg')",
                    backgroundSize: "cover",
                    minHeight: "100vh"
                    }}
>
    
</div>

            <Descripcion/>
        </div>
    )

}

export default Inicio;