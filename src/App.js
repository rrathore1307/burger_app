import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route} from 'react-router-dom'
import Orders from './container/Orders/Orders';
import Auth from './container/Auth/Auth';
import Logout from './container/Auth/Logout/Logout';
import {connect} from 'react-redux'
import * as actionType from '../src/store/actions/index'
class App extends Component {
  state = {
    show : true
  }
  

  componentDidMount() {
    this.props.onAutoAuthCheck();
  }

  render() {
    return (
      <div>
        <Layout>
         {/* <BurgerBuilder /> */}
         {/* <Checkout /> */}
         <Route path='/' exact component={BurgerBuilder} />
         <Route path='/checkout' component={Checkout} />
         <Route path='/orders' component={Orders}/>
         <Route path='/auth' component={Auth}/>
         <Route path='/logout' component={Logout} />
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    onAutoAuthCheck: ()=>dispatch(actionType.authCheckState())
  }
}

export default connect(null, mapDispatchToProps)(App);
