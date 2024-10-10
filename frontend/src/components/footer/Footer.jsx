import React from 'react'
import img1 from '../assists/haulix-high-resolution-logo-transparent.png'

function Footer() {
  return (
    <>
    <div className="footer-content">
    <div className='footer-logo'>
      <img src={img1} alt="" />
      <p>A new way to make the transport easy, reliable and secure.</p>
    </div>
    <div className="footer-content-list">
      <ul>
        <li className='footer-content-list-heading'>usefull links</li>
        <li><a href="">content</a></li>
        <li><a href="">how it works</a></li>
        <li><a href="">create</a></li>
        <li><a href="">explore</a></li>
        <li><a href="">term & services</a></li>
      </ul>
      <ul>
        <li className='footer-content-list-heading'>community</li>
        <li><a href="">help center</a></li>
        <li><a href="">partners</a></li>
        <li><a href="">suggestiions</a></li>
        <li><a href="">blogs</a></li>
        <li><a href="">newsletters</a></li>
      </ul><ul>
        <li className='footer-content-list-heading'>partners </li>
        <li><a href="">become a partners</a></li>
        <li><a href="">work with us</a></li>
      </ul>
    </div>
    </div>
    <div className="footer-line">
      <p>Copyright @ 2021 HooBank. All Rights Reserved.</p>
      <i className='fas fa-sharpe instagram'></i>
      <i className='fas fa-clock'></i>
      <i className="fas fa-clock"></i>
    </div>
    </>
  )
}

export default Footer
