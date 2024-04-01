import { useState } from 'react'
import './Auth.css'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
const Auth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
    const [logIn, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate();
    console.log(cookies)
    const seeLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }
    const loginSubmit = async (e, endpoint) => {
        e.preventDefault()
        if(!logIn && password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const data = await response.json()
        if (data.detail) {
            setError(data.detail)
        } else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)
            navigate("/");
        }
    }
    return (
        <div className="auth-container">
            <div className="auth-container-box">
                <form>
                    <h2>{logIn ? 'Log In....and Barter' : 'Sign up!'}</h2>
                    <input type="email" 
                    placeholder="email" 
                    onChange={(e) => setEmail(e.target.value)}/>
                    <input type="password" 
                    placeholder="password" 
                    onChange={(e) => setPassword(e.target.value)}/>
                    {!logIn && <input type="password" 
                    placeholder="confirm password" 
                    onChange={(e) => setConfirmPassword(e.target.value)}/>}
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