import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {

    componentWillUpdate() {
        console.log('Order Summary')
    }

    render() {
        const summary = Object.keys(this.props.ingredient)
        .map(igKey => {
            return (
                <li key={igKey}><span style={{ textTransform: "capitalize" }}>{igKey}</span>: {this.props.ingredient[igKey]}</li>
            )
        })
        return (
            <Aux>
                <h3>Your order summary</h3>
                <p>A delicious burger with the following</p>
                <ul>{summary}</ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong> </p>
                <p>Continue to checkout?</p>
                <Button
                    btnType={'Danger'}
                    clicked={this.props.purchasCancel}>
                    Cancel
                </Button>
                <Button
                    btnType={'Success'}
                    clicked={this.props.purchaseContinue}>
                    Continue
                </Button>
            </Aux>
        )
    }
}
export default OrderSummary;