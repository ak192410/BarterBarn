import React from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import trades from '../Assets/trades.png'
const Navbar = () => {
  return (
    <div className ='navbar'>
      <div className ='navlogo'>
        <img style={{width:132, height:76}} src={logo} alt=""/>
      </div>
      <div className='title'>
        <p>BARTERBARN</p>
      </div>
      <div className = 'navTradeLogin'>
        <button>new trade</button>
        <button>login</button>
        <img style={{width:110, height:92}} src={trades} alt=""/>
        <div className ='tradeCount'>0</div>
      </div>
    </div>
  )
}

export default Navbar