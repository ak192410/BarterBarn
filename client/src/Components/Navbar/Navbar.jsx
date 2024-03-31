import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import trades from '../Assets/trades.png'
import { Link } from 'react-router-dom';
import { useAuthToken } from '../../context';
const Navbar = () => {
  const authToken = useAuthToken();
  return (
    <div className ='navbar'>
      <div className ='navlogo'>
        <Link to="/">
          <img style={{width:132, height:76}} src={logo} alt=""/>
        </Link>
      </div>
      <div className='title'>
        <Link style={{textDecoration: 'none', color: 'inherit'}}to="/">
          <p>BARTERBARN</p>
        </Link>
      </div>
      <div className = 'navTradeLogin'>
        <Link to={authToken ? "/NewItem": '/Login'}>
          <button>new trade</button>
        </Link>
        {!authToken &&
        <Link to="/Login">
          <button>login</button>
        </Link>
        }
        {authToken &&
          <button>logout</button>
        }
        <Link to={authToken ? "/Cart": '/Login'}>
          <img style={{width:110, height:92}} src={trades} alt=""/>
        </Link>
        
        <div className ='tradeCount'>0</div>
      </div>
    </div>
  )
}

export default Navbar