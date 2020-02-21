import React, { Component, useEffect, useReducer, useState } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/index'

const BurgerBuilder = props => {


    const [purchasingState, setPurchasing] = useState(false);
    const [loadedState, setLoader] = useState(false)


    useEffect(() => {
        console.log("props ings",props.ings)
        props.onInitIngredient();
    }, [])

    const updatePuchaseIngredient = (updateIngredients) => {
        const sum = Object.keys(updateIngredients).map(igKey => {
            return updateIngredients[igKey]
        }).reduce((pre, current) => (pre + current), 0)
        console.log('ingredient sum= ' + sum)
        return sum > 0
    }

    const purchaseHandler = () => {
        console.log('purchase')
        setPurchasing(true);
        if (!props.isAuthenticate) {
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth')
        }
    }
    const purchasCancel = () => {
        setPurchasing(false);
    }
    const purchaseContinue = () => {
        props.onInitPurchase();
        props.history.push('/checkout')
    }
    const disableInfo = {
        ...props.ings
    }
    for (let key in disableInfo) {
        disableInfo[key] = disableInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.error ? <p>ingredient can't be loaded</p> : <Spinner />
    console.log('burger render', props.ings)
    if (props.ings) {
        burger = (
            <Aux>
                <Burger ingredient={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdd}
                    ingredientRemove={props.onIngredientRemove}
                    disableInfo={disableInfo}
                    price={props.totalPrice}
                    isAuth={props.isAuthenticate}
                    orderNow={updatePuchaseIngredient(props.ings)}
                    purchaseClick={purchaseHandler}
                />
            </Aux>
        );

        orderSummary = <OrderSummary
            ingredient={props.ings}
            purchaseContinue={purchaseContinue}
            purchasCancel={purchasCancel}
            price={props.totalPrice}
        />

        if (loadedState.loader) {
            orderSummary = <Spinner />
        }
    }

    return (
        <Aux>
            {purchasingState && <Modal show={purchasingState} modalClosed={purchasCancel}>
                {orderSummary}
            </Modal>}
            {burger}
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error,
        isAuthenticate: state.authReducer.token !== null,
        buildingBurger: state.burgerReducer.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientRemove: (ingredientName) => dispatch(actionTypes.removeIngredient(ingredientName)),
        onIngredientAdd: (ingredientName) => dispatch(actionTypes.addIngredient(ingredientName)),
        onInitIngredient: () => dispatch(actionTypes.initIngredient()),
        onInitPurchase: () => dispatch(actionTypes.purchaseInit()),
        onSetRedirectPath: (redirectPath) => dispatch(actionTypes.setAuthRedirectPath(redirectPath))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));