import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux'
import ContactDetail from './ContactDetail/ContactDetail';
class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    processCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-detail')
    }

    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {}
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = + param[1];
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients, totalPrice: price
    //     })
    //     console.log(ingredients)
    // }

    processCheckoutCancel = () => {
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    checkoutContinue={this.processCheckoutContinue}
                    checkoutCancel={this.processCheckoutCancel}
                />
                <Route path={this.props.match.path + '/contact-detail'} component={ContactDetail} />
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice
    }
}

export default connect(mapStateToProps)(Checkout);