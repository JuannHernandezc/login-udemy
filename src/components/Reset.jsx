import React, { useState, useCallback } from "react";

// Firebase 
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "@firebase/auth";

//React Router - Dom 
import { useNavigate } from "react-router-dom";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const processData = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email no puede estar vacio");
      return;
    }
    setError(null);
    resetPassword();
  };

  const resetPassword = useCallback(async()=> {
    try {
        await sendPasswordResetEmail(auth,email)
        console.log('Correo Enviado');
        navigate('/login');
    } catch (error) {
        setError(error.message)
    }
  }, [email,navigate]);
  return (
    <div className="mt-5">
      <h3 className="text-center">Restablecer Constraseña</h3>
      <hr />
      <div className="row justify-content-center">
        <div className="col-12 col-sm-8 col-md-6 col-xl-4">
          <form onSubmit={processData}>
            {error && <div className="alert alert-danger">{error}</div>}
            <input
              type="email"
              className="form-control mb-2"
              placeholder="Ingrese un Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <div className="d-grid gap-2">
              <button className="btn btn-dark btn-lg" type="submit">
                Restablecer contraseña
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Reset;
