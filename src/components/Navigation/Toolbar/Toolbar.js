import React from 'react';
import './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItem/NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
const Toolbar =(props)=>(
    <header className='Toolbar'>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className='ToolbarLogo'>
            <Logo />
        </div>
        <nav className='DesktopOnly'>
            <NavigationItems />
        </nav>
    </header>
)
export default Toolbar;