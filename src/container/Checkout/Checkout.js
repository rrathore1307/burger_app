import React, { useEffect } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import ContactDetail from './ContactDetail/ContactDetail';
import * as actionType from '../../store/actions/index'
const Checkout = props => {

    const processCheckoutContinue = () => {
        props.history.replace('/checkout/contact-detail')
    }

    useEffect (()=>{
        props.onInitPurchase();
    },[])

    const processCheckoutCancel = () => {
        props.history.goBack();
    }
    let summary = <Redirect to='/' />

    if (props.ings) {
        const purchaseRedirect = props.purchased ? <Redirect to='/' /> : null
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutContinue={processCheckoutContinue}
                    checkoutCancel={processCheckoutCancel}
                />
                <Route path={props.match.path + '/contact-detail'} component={ContactDetail} />
            </div>)
    }
    return summary
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        purchased: state.orderReducer.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitPurchase: () => dispatch(actionType.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);