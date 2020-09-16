import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

//redux
import { useDispatch } from "react-redux";
import {
  borrarProductoAction,
  obtenerProductoEditar,
} from "../actions/productoActions";

const Producto = ({ producto }) => {
  const { nombre, precio, id } = producto;
  const dispatch = useDispatch();
  const history = useHistory();
  //Confirmar eliminacion

  const confirmarEliminarProducto = (id) => {
    //Preguntar al usuario
    Swal.fire({
      title: "¿Estás seguro?",
      text: "El producto no podrá ser recuperado",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si,eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        //Pasarlo al accion
        dispatch(borrarProductoAction(id));
      }
    });
  };

  //funcion que redirige de forma programada

  const redireccionarEdicion = (producto) => {
    dispatch(obtenerProductoEditar(producto));
    history.push(`/productos/editar/${producto.id}`);
  };

  return (
    <tr>
      <td>{nombre}</td>
      <td>
        <span className="font-weight-bold">$ {precio} </span>
      </td>
      <td className="acciones">
        <button
          onClick={() => redireccionarEdicion(producto)}
          type="button"
          to={`/productos/editar/${id}`}
          className="btn btn-primary mr-2"
        >
          Editar
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => confirmarEliminarProducto(id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Producto;