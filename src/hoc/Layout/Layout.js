import React, { Component } from 'react';
import './Layout.css'
import Aux from '../Aux/Aux';
import {connect} from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }

    render() {
        return (
            <Aux>
                <Toolbar isAuth={this.props.authenticated} drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer isAuth={this.props.authenticated} open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
                <main className='Content'>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps=state => {
    return {
        authenticated: state.authReducer.token !== null
    }
}

export default connect(mapStateToProps)(Layout);