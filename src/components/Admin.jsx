import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Firestore from "./Firestore";


const Admin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.currentUser) {
      console.log("Existe un usuario");
      setUser(auth.currentUser);
    } else {
      console.log("No existe un usuario");
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      {user && <Firestore user={user}/>}
    </div>
  );
};
export default Admin;
