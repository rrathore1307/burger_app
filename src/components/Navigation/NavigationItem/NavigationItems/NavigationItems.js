import React from 'react';
import NavigationItem from '../NavigationItem';
import './NavigationItems.css'
const NavigationItems = ()=> (
    <ul className='NavigationItems'> 
        <NavigationItem link='/' exact >Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Order</NavigationItem>
        <NavigationItem link='/auth'>Auth</NavigationItem>
    </ul>
)
export default NavigationItems;