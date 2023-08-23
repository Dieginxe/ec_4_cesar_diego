const React = require('react');
const { Link, useParams } = require('react-router-dom');
const { useState, useEffect } = require('react');
const client = require('../client');

const VerVentaPage = () => {

    let { id } = useParams();
    const [venta, setVenta] = useState({});
    const [detalleVentas, setDetalleVentas] = useState([]);


    useEffect(() => {
        client({
            method: 'GET',
            path: '/api/ventas/' + id
        }).done(response => setVenta(response.entity))
        client({
            method: 'GET',
            path: '/api/ventas/' + id + '/formacion'
        }).done(response => setDetalleVentas(response.entity))
    }, [])


    return (
        <>
            <h1>Ver Venta</h1>
            <hr />

            <table border="1">
                <tbody>
                    <tr>
                        <th>Total</th>
                        <td>{venta.total}</td>
                    </tr>
                </tbody>
            </table>
            <hr />

            <h2>Detalle</h2>
            <table border="1">
                <thead>
                    <tr>
                        
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                
                <tbody>
                   
                {detalleVentas.map(detalleVenta => {
                 
                    return (
                        <tr key={detalleVenta.ID}>
                            <td>{detalleVenta.producto}</td> {/* Cambiado de "manty" a "producto" */}
                            <td>{detalleVenta.CANTIDAD}</td>
                            
                            
                        </tr>
                    );
                })}
                </tbody>
               
            </table>

            <hr />
            <Link to={`/ver-venta/${id}/nuevo-detalleVenta`}>Nuevo detalleventa</Link> |
            <Link to="/">Volver</Link>
        </>
    )

}

module.exports = VerVentaPage;