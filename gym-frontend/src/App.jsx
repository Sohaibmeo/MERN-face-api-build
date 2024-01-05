import './App.css';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';

import Navbar from "./components/Navbar";
import { Home, AddNew, Attendance, Login, Contact } from './pages';
export const WebsiteNecessaties = createContext()

const App = () => {
  const navigate = useNavigate();
  const [token,setToken] = useState("");
  const [userList,setUserList] = useState([])
  const [attendanceList,setAttendanceList] = useState({
    users: ["0"],
    date: ""
  })

  useEffect(()=> {
    const loadUsers = async() => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        setUserList(response.data);
      } catch (error) {
        console.log("Could Not Load Users ",error.message);
      }
    }
    const loadAttendance = async() => {
      try {
        const attendance = await axios.get(`http://localhost:8080/attendance/get-record-today`)
        setAttendanceList(attendance.data);
      } catch (error) {
        console.log("Error loading attendance ",error.message)
      }
    }
    const tokenVerification = async() => {
      try {
          const localToken = localStorage.getItem('token');
          if(!localToken){
            console.error("Local Token Missing");
            navigate("/login")
          }else {
            const body = {
              "token": JSON.parse(localToken),
            };
            const response = await axios.post("http://localhost:8080/admin/verify-token",body)
            if(!response.data){
                throw new Error("Token Expired")
            }
            setToken(localToken)
          }
      } catch (error) {
          console.error("Error :  "+ error.message)
          localStorage.removeItem('token');
          setToken("")
      }
    }
    const tokenCheck = async () => {
      try {
        if(!token){
          console.error("Application Token Missing")
          await tokenVerification()
        }else {
          await loadUsers()
          await loadAttendance()
        }
      } catch (error) {
        console.log("Error : ",error.message)
      }
    };

    tokenCheck()
    //eslint-disable-next-line
  },[token,setToken])

  return (
    <WebsiteNecessaties.Provider value=
    {{
      token:[token,setToken],
      users:[userList,setUserList],
      attendance:[attendanceList,setAttendanceList]
    }}>
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
              <Route  path="/login" element={<Login/>} />
          }
        </Routes>
      </div>
    </WebsiteNecessaties.Provider>
  );
}

export default App;
