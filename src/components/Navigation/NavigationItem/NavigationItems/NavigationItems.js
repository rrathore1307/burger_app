import React from 'react';
import NavigationItem from '../NavigationItem';
import './NavigationItems.css'
const NavigationItems = (props) => (
    <ul className='NavigationItems'>
        <NavigationItem link='/' exact >Burger Builder</NavigationItem>
        {
            props.isAuthenticated ? <NavigationItem link='/orders'>Order</NavigationItem> : null
        }

        {
            props.isAuthenticated ?
                <NavigationItem link='/logout'>Logout</NavigationItem>
                :
                <NavigationItem link='/auth'>Auth</NavigationItem>
        }

    </ul>
)
export default NavigationItems;