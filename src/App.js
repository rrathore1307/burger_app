import React, { Component } from 'react';
import './App.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import Checkout from './container/Checkout/Checkout';
import {Route} from 'react-router-dom'
import Orders from './container/Orders/Orders';
class App extends Component {
  state = {
    show : true
  }
  

  componentDidMount() {
   
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
        </Layout>
      </div>
    );
  }
}

export default App;
