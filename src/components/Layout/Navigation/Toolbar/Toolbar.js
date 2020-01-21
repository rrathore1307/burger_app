import React from 'react';
import './Toolbar.css';
import Logo from '../../../Logo/Logo';
import NavigationItems from '../NavigationItem/NavigationItems/NavigationItems';
const Toolbar =()=>(
    <header className='Toolbar'>
        <div>Menu</div>
        <div className='ToolbarLogo'>
            <Logo />
        </div>
        <nav>
            <NavigationItems />
        </nav>
    </header>
)
export default Toolbar;