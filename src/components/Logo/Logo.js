import React from 'react';
import './Logo.css'
import LogoImage from '../../assets/images/burger-logo.png'
const Logo =()=>(
    <div className="Logo">
        <img src={LogoImage} alt="My Burger" />
    </div>
)
export default Logo;