import React from 'react';
import './Layout.css'
import Aux from '../../hoc/Aux';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';
const Layout =(props)=> (
    <Aux>
        <Toolbar />
        <SideDrawer />
        <main className='Content'>
            {props.children}
        </main>
    </Aux>
)
export default Layout;