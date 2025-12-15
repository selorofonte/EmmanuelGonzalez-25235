import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Container, Form, Button } from 'react-bootstrap';
 
 
 function Ingresa() {
 const [usuario, setUsuario] = useState('');
 const [password, setPassword] = useState('');
 const { login, estaLogueado } = useAuthContext();
 const navigate = useNavigate();

 // Base local que contiene los permisos

 const basedatos =[{nombre: "emma", clave:"3221",permiso:"user"},  {nombre:"ale",clave:"abcd",permiso:"user"}, {nombre:"admin",clave:"admin",permiso:"admin"} ];

 

 const handleSubmit = (e) => {
                e.preventDefault();
                // Cruzo datos del login
                const usuarioSinVerificar = basedatos.find(user => user.nombre === usuario);
                // Determino si existe y devuelvo su informacion
                if (typeof usuarioSinVerificar !== "undefined") {
                            if ((usuario === usuarioSinVerificar.nombre) && (password === usuarioSinVerificar.clave)  && (usuarioSinVerificar.permiso=== "user")) {
                            //Nombre y permiso cliente
                            login(usuario,"user");
                            navigate('/productos');}
                            else if ((usuario === usuarioSinVerificar.nombre) && (password === usuarioSinVerificar.clave)  && (usuarioSinVerificar.permiso=== "admin")) {
                             //Nombre y permiso Administrador
                            login(usuario,"admin");
                            navigate('/administracion');       
                            }
                } else {
                alert('El usuario no se encuentra');
                }
            };
 return (

        <div style={{margin:'1rem'}} >
        
            {/* Formulario login */}
            <Container style={{maxWidth:"20rem"}}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" >
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control  type="input"  value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Clave</Form.Label>
                        <Form.Control  type="password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>

                    <Form.Text id="passwordHelpBlock" muted>
                        Su clave debe ser segura
                    </Form.Text>
                    <br />
                    <Button type="submit"> Ingresar</Button>
                </Form>
            </Container>
        
            
        </div>
    )

}

 export default Ingresa;

