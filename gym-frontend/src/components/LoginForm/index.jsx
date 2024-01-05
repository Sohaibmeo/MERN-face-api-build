import axios from 'axios';
import { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom'


import { WebsiteNecessaties } from '../../App';
import Logo from "../../assets/images/Logo.png"
import './index.css'

const LoginForm = () => {
    const navigate = useNavigate();
    const { token } = useContext(WebsiteNecessaties)
    const [isLoading,setIsLoading] = useState('')
    let isSubmitting = false
    const [formData,setFormData] = useState({
        "email": "",
        "password": ""
    })

    const submitHandler = async(event) => {
        event.preventDefault();
        setIsLoading('loading')
        try {
            if (isSubmitting){
                throw new Error("Previous Login Attempt In Progress")
            }
            isSubmitting=true
            const result = await axios.get("http://localhost:8080/admin/login",{
                auth: {
                    username: formData.email,
                    password: formData.password
                  }
            })
            console.log(result)
            if(result?.data?.token){
                setIsLoading('loaded')
                const setToken = token[1];
                const assignedToken = result.data.token;
                setToken(assignedToken);
                localStorage.setItem('token',JSON.stringify(assignedToken));
                isSubmitting=false
                navigate("/");
            }else {
                setIsLoading('failed')
                throw new Error("INVALID TOKEN RECEIVED FROM BACKEND")
            }
        } catch (error) {
            console.error(error);
        }
    }

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
            <button disabled={isLoading} type="submit" className='buttonForm' ><span className={`${isLoading}`}>{isLoading ? '' : 'Login'}</span></button>
        </form>
    )
}

export default LoginForm;