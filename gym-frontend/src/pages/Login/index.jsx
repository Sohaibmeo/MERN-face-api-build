import './index.css'
import LoginForm from '../../components/LoginForm'
const Login = ({setToken,token}) => {

    return (
        <div className='loginWrapper'>
            <LoginForm setToken={setToken} token={token}/>
        </div>
    )
}

export default Login;