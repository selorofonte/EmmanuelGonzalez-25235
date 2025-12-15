import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';

// URL de MockAPi
const API_URL = 'https://693fa7e712c964ee6b709e36.mockapi.io/Tienda/TiendaOnLine';

const CrudProductos = () => {
// El estado de productos
  const [productos, setProductos] = useState([]);
// Mostrar o no cuadro de diálogo
  const [show, setShow] = useState(false);
// Estado del formulario 
  const [form, setForm] = useState({ name: '', descripcion: '', price: '', stock:'', imagen: '', id: '' });
// Busqueda por id
  const [editId, setEditId] = useState(null);

// Solicitud a Mockapi
  const getProductos = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setProductos(data);
  };

// Limpia el formulario
  const handleClose = () => {
    setShow(false);
    setForm({ name: '', descripcion: '', price: '',stock:'', imagen: '', id: ''});
    setEditId(null);
  };

// Campos para editar producto
  const handleShow = (producto) => {
    setShow(true);
    // Si existe se edita
    if (producto) {
      setForm({
        ...producto,
        price: Number(producto.price)
      });
    // Si no existe se agrega
      setEditId(producto.id);
    }
  };
//
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price)
      //Stock
    };

    // Editar con PUT
    // Agregar es POST
    const method = editId ? 'PUT' : 'POST';
    const url = editId ? `${API_URL}/${editId}` : API_URL;
    //Actualiza MaockApi
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData)
    });
    //  Limpia el formulario 
    handleClose();
    // Se traen los productos de MaockApi
    getProductos();
  };

//Borra item por id 
  const eliminarProducto = async (id) => {
    if (window.confirm('¿Seguro que desea eliminar?')) {
      //  Fetch usa el metodo DELETE de MaockApi
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      // Refresca desde MaockApi
      getProductos();
    }
  };




  useEffect(() => {
    getProductos();
  }, []);


  // Se presenta una tabla con elementos de MaockApi
  //  Se muestra alta baja y modificacion en los botones para admin

  return (
    <div className="container mt-4">
      <h2 className='text-center'> Productos</h2>
      {/* Boton para agregar  */}
      <Button className="mb-4 mt-3" variant="success" onClick={() => handleShow()}>Agregar Producto</Button>
      <Table striped bordered hover responsive="md" >
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        {/* Recorrer Tabla */}
        <tbody>
          {productos.map(prod => (
            <tr key={prod.id}>
              <td>{prod.name}</td>              
              <td>{prod.descripcion}</td>
              <td>{prod.stock}</td>
              <td>${Number(prod.price).toFixed(2)}</td>
              <td>
                <img src={prod.imagen} alt={prod.id} width={50} />
              </td>
              <td>
                {/* Boton para editar producto*/}
                <Button size="sm" className='m-2' variant="warning" onClick={() => handleShow(prod)}>Editar</Button>{' '}
                {/* Boton para eliminar producto */}
                <Button size="sm" className='m-2' variant="danger" onClick={() => eliminarProducto(prod.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Formulario para editar o agregar */}
      {/* Al salir se actualiza el MockApi */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? 'Editar' : 'Agregar'} Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Detalles</Form.Label>
              <Form.Control
                value={form.descripcion}
                onChange={e => setForm({ ...form, descripcion: e.target.value })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                value={form.price}
                onChange={e => setForm({ ...form, price: Number(e.target.value) })}
                required
              />
            </Form.Group>
           <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={form.stock}
                onChange={e => setForm({ ...form, stock: Number(e.target.value) })}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagen (URL)</Form.Label>
              <Form.Control
                value={form.imagen}
                onChange={e => setForm({ ...form, imagen: e.target.value })}
                required
              />
            </Form.Group>
            <Button type="submit" className="mt-2">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CrudProductos;