import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Navbar from "./components/Navbar";
import { Home, AddNew, Attendance, Login } from './pages';

const App = () => {
  const navigate = useNavigate();
  const [token,setToken] = useState("");
  
  useEffect(()=> {
    const loader = async () => {
      if(!token){
        return navigate("/login");
      }
    };
    loader()
  },[token,navigate])

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
            </> : 
            <Route  path="/login" element={<Login setToken={setToken} token={token} />} />
          }
        </Routes>
      </div>
    </>
  );
}

export default App;
