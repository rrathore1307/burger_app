import React from 'react';
import NavigationItem from '../NavigationItem';
import './NavigationItems.css'
const NavigationItems = ()=> (
    <ul className='NavigationItems'> 
        <NavigationItem link='/' active>Burger Builder</NavigationItem>
        <NavigationItem link='/'>Burger Builder</NavigationItem> 
    </ul>
)
export default NavigationItems;