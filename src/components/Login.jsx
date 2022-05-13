import React, { useCallback, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc, addDoc, collection as cl } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [esRegistro, setEsRegistro] = useState(true);

  const navigate = useNavigate();

  const processData = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email no puede estar vacio");
      return;
    }
    if (!password.trim()) {
      setError("Password no puede estar vacio");
      return;
    }
    if (password.length < 6) {
      setError("la contraseña debe ser mayor a 6 caracteres");
      return;
    }
    setError(null);

    if (esRegistro) {
      register();
    } else {
      login();
    }
  };

  const login = useCallback(async () => {
    try {
      const answer = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/admin");
      console.log(answer.user);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Ingrese un Email valido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Email NO registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta");
      }
    }
  }, [email, password, navigate]);

  const register = useCallback(async () => {
    try {
      const answer = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const collection = doc(db, "users", answer.user.uid);
      await setDoc(collection, {
        uid: answer.user.uid,
        email: answer.user.email,
      });

      await addDoc(cl(db, answer.user.uid), {
        name: "Aqui recuerda poner tus tareas",
      });

      setEmail("");
      setPassword("");
      setError(null);
      navigate("/admin");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Ingrese un Email valido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("Email ya utilizado");
      }
    }
  }, [email, password, navigate]);

  return (
    <div className="mt-5">
      <h3 className="text-center">
        {esRegistro ? "Registro de usuarios" : "Inicio de sesión Usuarios"}
      </h3>
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
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Ingrese un Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <div className="d-grid gap-2">
              <button className="btn btn-dark btn-lg" type="submit">
                {esRegistro ? "Registrarse" : "Iniciar Sesión"}
              </button>
            </div>
            <div className="d-grid gap-2">
              <button
                className="btn btn-info btn-sm mt-2"
                onClick={() => setEsRegistro(!esRegistro)}
                type="button"
              >
                {esRegistro ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
              </button>
            </div>
            {!esRegistro ? (
              <div className="d-grid gap-2">
                <button
                  className="btn btn-danger btn-lg btn-sm mt-2"
                  type="button"
                  onClick={() => navigate("/reset")}
                >
                  Recuperar Contraseña
                </button>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
