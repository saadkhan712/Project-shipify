import React from 'react'
import './Header.css'
import log from '../assists/logo.jpg';

function Header() {
  return (
    <div className='header-area'>
        <div className="header-navbar-area section__padding ">
          <img src={log} alt="logo" />
          <div className="navbar-content">
            <ul>
            <li> <a href="">main</a> </li>
            <li> <a href="">services</a> </li>
            <li> <a href="">our work</a> </li>
            <li> <a href="">contact US</a> </li>
            </ul>
          </div>
          <div className="button-for-sign-in" />
          <button>sign-in</button>
        </div>
        <div className="header-content-area "></div>
          <div className="written-area">
          <h1>Haulix</h1>
          <p>National Goods Transportation Infrastructure</p>
          </div>
    </div>
  ) 
} 
 
export default Header
