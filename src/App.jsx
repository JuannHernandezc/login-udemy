import { useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login"
import Admin from "./components/Admin";
import {auth} from "./firebase"
import { onAuthStateChanged } from "firebase/auth";
import Reset from "./components/Reset";

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      console.log(user);
      if(user){
        setFirebaseUser(user);
      }else{
        setFirebaseUser(null);
      }
    })
  },[])

  return firebaseUser !== false ? (
    <BrowserRouter>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}/>
        <Routes>
          <Route path="/"/>
          <Route path="/login" element={<Login/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/reset" element={<Reset/>} />
        </Routes>
      </div>
    </BrowserRouter>
  ) : (
    <p>Cargando</p>
  )
}

export default App;
