import React from 'react';
import Logo from '../../../Logo/Logo';
import './SideDrawer.css';
import NavigationItems from '../NavigationItem/NavigationItems/NavigationItems';
const SideDrawer =()=> {
    return (
        <div className='SideDrawer'>
            <div className='SideDrawerLogo'>
                <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    )
}
export default SideDrawer;