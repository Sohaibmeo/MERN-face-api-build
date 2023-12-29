import './index.css'
import Logo from "../../assets/images/Logo.png"
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const LoginForm = ({setToken}) => {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        "email": "",
        "password": ""
    })
    const submitHandler = async(event) => {
        event.preventDefault();
        try {
            const result = await axios.post("http://localhost:8080/admin/create-token",formData)
            if(result?.data?.backendToken){
                const assignedToken = result.data.backendToken;
                setToken(assignedToken);
                localStorage.setItem('token',JSON.stringify(assignedToken));
                navigate("/");
            }else {
                throw new Error("INVALID TOKEN RECEIVED FROM BACKEND")
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        const tokenVerification = async() => {
            try {
                const localToken = localStorage.getItem('token');
                if(!localToken){
                   throw new Error("LOCAL SESSION MISSING")
                }
                //TODO : should encode this body
                const body = {
                    "email": "sohaibmayo12@gmail.com",
                    "assignedToken": JSON.parse(localToken),
                };
                const response = await axios.post("http://localhost:8080/admin/verify-token",body)
                if(!response.data){
                    throw new Error("Session INVALID")
                }
                setToken(localToken)
                navigate("/");
            } catch (error) {
                console.error("Error :  "+ error)
                localStorage.removeItem('token');
                setToken("")
            }
        }
        tokenVerification()
    },[setToken,navigate])

    return(
        <form className="formWrapper" onSubmit={submitHandler}>
            <img src={Logo} alt="Logo Enlarged" className="loginLogo"/>
            <input 
                type="text"
                placeholder='Email'
                name="email"
                onChange={(e)=> setFormData((prev)=> ({...prev,[e.target.name]:e.target.value}))} 
            />
            <input 
                type="password" 
                name="password"
                placeholder='Password'
                onChange={(e)=> setFormData((prev)=> ({...prev,[e.target.name]:e.target.value}))}
            />
            <button type="submit" className='buttonForm'>Login</button>
        </form>
    )
}

export default LoginForm;