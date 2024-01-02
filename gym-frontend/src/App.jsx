import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from "./components/Navbar";
import { Home, AddNew, Attendance, Login, Contact } from './pages';

const App = () => {
  const navigate = useNavigate();
  const [token,setToken] = useState("");
  
  useEffect(()=> {
    const loader = async () => {
      //problem in app that you can't directly access a url it refreshed you back to home
      //TODO: WE CAN SEE THE LOGIN PAGE FOR A SECOND ALSO I THINK THIS LOGIC NEEDS TO BE REVISED FOR SURE
      if(!token){
        return navigate("/login");
      }
    };
    loader()
  },[token,navigate])


  //change this no route strategy (its better to redirect them instead)
  return (
    <>
    <Navbar token={token} setToken={setToken}/>
      <div className="container">
        <Routes>
          {token ? 
            <>
            <Route exact path="/" element={<Home />} />
            <Route  path="/new-member" element={<AddNew />} />
            <Route  path="/attendance" element={<Attendance />} />
            <Route  path="/contact" element={<Contact />} />
            </> : 
            <Route  path="/login" element={<Login setToken={setToken} token={token} />} />
          }
        </Routes>
      </div>
    </>
  );
}

export default App;
