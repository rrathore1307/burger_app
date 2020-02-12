import React from 'react';
import Logo from '../../Logo/Logo';
import './SideDrawer.css';
import NavigationItems from '../NavigationItem/NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
const SideDrawer =(props)=> {
    let classes = ['SideDrawer', 'Close']

    if(props.open) {
        classes = ['SideDrawer', 'Open']
    }

    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed} />
            <div className={classes.join(' ')} onClick={props.closed}>
                <div className='SideDrawerLogo'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </Aux>
    )
}
export default SideDrawer;