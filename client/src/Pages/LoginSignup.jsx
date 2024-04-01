import React from 'react'
import Auth from '../Components/Auth'
import { useCookies } from 'react-cookie'
const LoginSignup = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  return (
    <div>
      {!authToken &&
      <div className='authClass'><Auth/></div>
      }
      {authToken &&
        <div><p>Hello {userEmail}</p></div>
      }
    </div>
  )
}

export default LoginSignup