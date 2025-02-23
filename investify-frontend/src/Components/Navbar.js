import React from 'react';
import "../App.css";
import logo from "../Images/Investify.png";
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='primary-flex transform-down'>
      <div className='primary-flex float-33 justify-end align-center'>
        <img src={logo} alt="" width={100} height={100} className='mar-right'></img>
        <Link to='/invest/equity' className='text-enlarge no-deco font-playfair mar-right active'>Equity</Link>
        <Link to='/invest/user/investments' className='text-enlarge no-deco font-playfair'>Investments</Link>
      </div>
      <div className='primary-flex float-33 justify-center align-center'>
        <input type='text' placeholder='What Do You Want To Search For Today?' className='search-bar transform-down'/>
      </div>
      <div className='primary-flex float-33 align-center'>
        <Link className='nav-icon whiten mar-right-extra'><ion-icon name="notifications-outline" size='large' className="nav-icon whiten mar-right-extra"></ion-icon></Link>
        <Link to='/' className='nav-icon whiten mar-right-extra'><ion-icon name="stopwatch-outline" size="large"></ion-icon></Link>
        <Link to='/' className='nav-icon whiten mar-right-extra'><ion-icon name="alarm-outline" size="large"></ion-icon></Link>
        <Link to='/' className='text-enlarge whiten no-deco'>Hi, User!</Link>
      </div>
    </div>
  )
}
