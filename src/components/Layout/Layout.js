import React from 'react';
import './Layout.css'
import Aux from '../../hoc/Aux';
const Layout =(props)=> (
    <Aux>
        <div>Toolbar, sidebar</div>
        <main className='Content'>
            {props.children}
        </main>
    </Aux>
)
export default Layout;