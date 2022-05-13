import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const Firestore = (props) => {
  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState("");
  const [modoEdicion, setModoEdicion] = useState(false);
  const [id, setId] = useState("");


  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const data = await getDocs(collection(db, props.user.uid));
        const arrayData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTareas(arrayData);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatos();
  }, [props.user.uid]);

  const agregar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Esta Vacio");
      return;
    }
    try {
      const nuevaTarea = {
        name: tarea,
      };
      const data = await addDoc(collection(db, props.user.uid), nuevaTarea);
      setTareas([...tareas, { ...nuevaTarea, id: data.id }]);
      setTarea("");
    } catch (error) {
      console.log(error);
    }
  };

  const eliminar = async (id) => {
    try {
      await deleteDoc(doc(db, props.user.uid, id));
      const arrayFilter = tareas.filter((item) => item.id !== id);
      setTareas(arrayFilter);
    } catch (error) {
      console.log(error);
    }
  };

  const activarEdicion = (item) => {
    setModoEdicion(true);
    setTarea(item.name);
    setId(item.id);
  };

  const editar = async (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log("Esta Vacio");
      return;
    }
    try {
      await updateDoc(doc(db, props.user.uid,id), {
        name: tarea,
      });
      const arrayEditado = tareas.map((item) =>
        item.id === id ? { id: item.id, name: tarea } : item
      );
      setTareas(arrayEditado);
      setModoEdicion(false);
      setTarea("");
      setId("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <h2 className="text-center">Listas de tareas</h2>
          <ul className="list-group">
            {tareas.map((item) => (
              <li key={item.id} className="list-group-item">
                {item.name}
                <button
                  className="btn btn-danger btn-sm float-end mx-2"
                  onClick={() => eliminar(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="btn btn-warning btn-sm float-end mx-2"
                  onClick={() => activarEdicion(item)}
                >
                  Editar
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-6">
          <h2 className="text-center">
            {modoEdicion ? "Editar Tarea" : "Agregar Tarea"}
          </h2>
          <form onSubmit={modoEdicion ? editar : agregar}>
            <input
              type="text"
              placeholder="Ingrese"
              className="form-control mb-2"
              onChange={(e) => setTarea(e.target.value)}
              value={tarea}
            />
            <div className="d-grid">
              <button
                className={modoEdicion ? "btn btn-warning" : "btn btn-primary"}
                type="submit"
              >
                {modoEdicion ? "Editar" : "Agregar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Firestore;
