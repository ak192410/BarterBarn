import { useState } from 'react'
import './Auth.css'
const Auth = () => {
    const [logIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const seeLogin = (status) => {
        setIsLogin(status)
    }
    const loginSubmit = async (e, endpoint) => {
        e.preventDefault()
        if(!logIn && password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`)
    }
    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{logIn ? 'Log In....and Barter' : 'Sign up!'}</h2>
                    <input type="email" placeholder="email"/>
                    <input type="password" placeholder="password"/>
                    {!logIn && <input type="password" placeholder="confirm password" />}
                    <input type="submit" className="create" onClick={(e) => loginSubmit(e, logIn ? 'login' : 'signup')}/>
                    {error && <p>{error}</p>}
                </form>
                <div className="authOptions">
                    <button 
                    onClick={() => seeLogin(false)}
                    style={{backgroundColor: logIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
                    >Sign up!</button>
                    <button
                    onClick={() => seeLogin(true)}
                    style={{backgroundColor: !logIn ? 'rgb(255, 255, 255)' : 'rgb(188, 188, 188)'}}
                    >Log In</button>
                </div>
            </div>
        </div>
    )
}
export default Auth