import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ContactDetail from './ContactDetail/ContactDetail';
import * as actionType from '../../store/actions/index'
class Checkout extends Component {
    // state = {
    //     ingredients: null,
    //     totalPrice: 0
    // }

    processCheckoutContinue = () => {
        this.props.history.replace('/checkout/contact-detail')
    }

    componentWillMount() {
        this.props.onInitPurchase();
        console.log('[purchased] will mount', this.props.purchased)
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
        let summary = <Redirect to='/' />
        console.log('[purchased]', this.props.purchased)

        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        checkoutContinue={this.processCheckoutContinue}
                        checkoutCancel={this.processCheckoutCancel}
                    />
                    <Route path={this.props.match.path + '/contact-detail'} component={ContactDetail} />
            </div>)
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        purchased: state.orderReducer.purchased
    }
}

const mapDispatchToProps= dispatch => {
    return {
        onInitPurchase: ()=>dispatch(actionType.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);