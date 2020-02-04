import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/index'

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loader: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props.ings)
        this.props.onInitIngredient();
        // axios.get('https://my-burger-app-455ac.firebaseio.com/ingredient.json')
        //     .then(res => {
        //         this.setState({
        //             ingredient: res.data
        //         })
        //     })
        //     .catch(error => {
        //         this.setState({
        //             error: true
        //         })
        //         console.log(error)
        //     })
    }

    addIngrediet = (type) => {
        // const oldCount = this.state.ingredient[type];
        // const updatedCount = oldCount + 1;
        // const updateIngredients = {
        //     ...this.state.ingredient
        // }
        // updateIngredients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICE[type];
        // const oldPrice = this.state.total_Price;
        // const newPrice = oldPrice + priceAddition;

        // this.setState({
        //     total_Price: newPrice,
        //     ingredient: updateIngredients
        // })
        // console.log(this.state.ingredient)
        // this.updatePuchaseIngredient(updateIngredients);
    }
    removeIngredient = (type) => {
        // const oldCount = this.state.ingredient[type];
        // if (oldCount === 0) {
        //     return;
        // }
        // const updatedCount = oldCount - 1;
        // const updateIngredients = {
        //     ...this.state.ingredient
        // }
        // updateIngredients[type] = updatedCount;
        // const priceAddition = INGREDIENT_PRICE[type];
        // const oldPrice = this.state.total_Price;
        // const newPrice = oldPrice - priceAddition;

        // this.setState({
        //     total_Price: newPrice,
        //     ingredient: updateIngredients
        // })
        // console.log(this.state.ingredient)
        // this.updatePuchaseIngredient(updateIngredients);
    }
    updatePuchaseIngredient = (updateIngredients) => {
        const sum = Object.keys(updateIngredients).map(igKey => {
            return updateIngredients[igKey]
        }).reduce((pre, current) => (pre + current), 0)
        console.log('ingredient sum= ' + sum)
        return sum > 0
    }

    purchaseHandler = () => {
        console.log('purchase')
        this.setState({
            purchasing: true
        })
    }
    purchasCancel = () => {
        this.setState({
            purchasing: false
        })
    }
    purchaseContinue = () => {
        this.props.history.push('/checkout')
    }
    render() {
        const disableInfo = {
            ...this.state.ingredient
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>ingredient can't be loaded</p> : <Spinner />
        console.log('burger render', this.props.ings)
        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemove={this.props.onIngredientRemove}
                        disableInfo={disableInfo}
                        price={this.props.totalPrice}
                        orderNow={this.updatePuchaseIngredient(this.props.ings)}
                        purchaseClick={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredient={this.props.ings}
                purchaseContinue={this.purchaseContinue}
                purchasCancel={this.purchasCancel}
                price={this.props.totalPrice}
            />

            if (this.state.loader) {
                orderSummary = <Spinner />
            }
        }

        return (
            <Aux>
                {this.state.purchasing && <Modal show={this.state.purchasing} modalClosed={this.purchasCancel}>
                    {orderSummary}
                </Modal>}
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state=>{
    return {
        ings: state.burgerReducer.ingredients,
        totalPrice: state.burgerReducer.totalPrice,
        error: state.burgerReducer.error
    }
}

const mapDispatchToProps = dispatch=> {
    return {
        onIngredientRemove: (ingredientName)=>dispatch(actionTypes.removeIngredient(ingredientName)),
        onIngredientAdd: (ingredientName)=>dispatch(actionTypes.addIngredient(ingredientName)),
        onInitIngredient: ()=>dispatch(actionTypes.initIngredient())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));