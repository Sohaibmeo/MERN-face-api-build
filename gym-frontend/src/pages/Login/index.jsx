import LoginForm from '../../components/LoginForm'
const Login = () => {
//I will redirect to Home if succesful Login
//I will prevent access to other pages if not login

    return (
        <>
            <p>I am the login page</p>
            <LoginForm />
        </>
    )
}

export default Login;