import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import './CheckoutSummary.css'
const CheckoutSummary = (props) => {
    console.log(props)
    return (
        <div className='CheckoutSummary'>
            <h1>We hope it tastes well!!</h1>
            <div style={{width:'100%', margin: 'auto'}}>
                <Burger ingredient={props.ingredients} />
            </div>
            <Button btnType='Danger' clicked={props.checkoutCancel}>CANCEL</Button>
            <Button btnType='Success' clicked={props.checkoutContinue}>Continue</Button>
        </div>
    )
}
export default CheckoutSummary;