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
    const currentUser = {
        email:"sohaibmayo12@gmail.com"
    }
    const submitHandler = async(event) => {
        event.preventDefault();
        try {
            const result = await axios.get("http://localhost:8080/admin/login",{
                auth: {
                    username: formData.email,
                    password: formData.password
                  }
            })
            console.log(result)
            if(result?.data?.token){
                const assignedToken = result.data.token;
                setToken(assignedToken);
                localStorage.setItem('token',JSON.stringify(assignedToken));
                navigate(-2);
            }else {
                throw new Error("INVALID TOKEN RECEIVED FROM BACKEND")
            }
        } catch (error) {
            console.error(error);
        }
    }
//TODO: I think this whole check logic should be somewhere outside cuz its still rendering on ligins
//TODO: put this into utils and move it way back aswell
    useEffect(()=>{
        const tokenVerification = async() => {
            try {
                const localToken = localStorage.getItem('token');
                if(!localToken){
                   throw new Error("LOCAL SESSION MISSING")
                }
                const body = {
                    "email": currentUser.email,
                    "token": JSON.parse(localToken),
                };
                const response = await axios.post("http://localhost:8080/admin/verify-token",body)
                console.log("Current Response",response)
                if(!response.data){
                    throw new Error("Session INVALID")
                }
                setToken(localToken)
                navigate(-2);
            } catch (error) {
                console.error("Error :  "+ error)
                localStorage.removeItem('token');
                setToken("")
            }
        }
        tokenVerification()
    },[setToken,navigate,currentUser.email])
    //TODO : Turn this into a loading animation for button when clicked once until the flag says you are gucci
    return(
        <form className="formWrapper" onSubmit={submitHandler}>
            <img src={Logo} alt="Logo Enlarged" className="loginLogo"/>
            <input 
                type="text"
                placeholder='Email'
                className='inputLogin'
                name="email"
                onChange={(e)=> setFormData((prev)=> ({...prev,[e.target.name]:e.target.value}))} 
            />
            <input 
                type="password" 
                name="password"
                placeholder='Password'
                className='inputLogin'
                onChange={(e)=> setFormData((prev)=> ({...prev,[e.target.name]:e.target.value}))}
            />
            <button type="submit" className='buttonForm'>Login</button>
        </form>
    )
}

export default LoginForm;