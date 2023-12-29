import './index.css'
import LoginForm from '../../components/LoginForm'
const Login = ({setToken}) => {

    return (
        <div className='loginWrapper'>
            <LoginForm setToken={setToken}/>
        </div>
    )
}

export default Login;