import React from "react";
import { Link, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {
  const navigate = useNavigate();

  const cerrarSesion = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          AUTH
        </Link>
        <div>
          <div className="d-flex">
            <NavLink className="btn btn-dark mr-2" to="/">
              Inicio
            </NavLink>
            {props.firebaseUser !== null ? (
              <NavLink className="btn btn-dark mr-2" to="/admin">
                Admin
              </NavLink>
            ) : null}

            {props.firebaseUser !== null ? (
              <button className="btn btn-dark" onClick={() => cerrarSesion()}>
                Cerrar sesión
              </button>
            ) : (
              <NavLink className="btn btn-dark mr-2" to="/login">
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
