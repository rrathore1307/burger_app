import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
const OrderSummary = (props) => {
    const summary = Object.keys(props.ingredient)
        .map(igKey => {
            return (
                <li key={igKey}><span style={{ textTransform: "capitalize" }}>{igKey}</span>: {props.ingredient[igKey]}</li>
            )
        })

    return (<Aux>
        <h3>Your order summary</h3>
        <p>A delicious burger with the following</p>
        <ul>{summary}</ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong> </p>
        <p>Continue to checkout?</p>
        <Button 
            btnType={'Danger'}
            clicked={props.purchasCancel}>
            Cancel
        </Button>
        <Button 
            btnType={'Success'}
            clicked={props.purchaseContinue}>
            Continue
        </Button>
    </Aux>)
}
export default OrderSummary;