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
import * as actionTypes from '../../store/actions'
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.6,
    meat: 1.2,
    cheese: 0.8
}
class BurgerBuilder extends Component {

    state = {
        ingredient: null,
        total_Price: 4,
        purchaseable: false,
        purchasing: false,
        loader: false,
        error: false
    }

    componentDidMount() {
        console.log(this.props.ingredients)
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
        const oldCount = this.state.ingredient[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredient
        }
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.total_Price;
        const newPrice = oldPrice - priceAddition;

        this.setState({
            total_Price: newPrice,
            ingredient: updateIngredients
        })
        console.log(this.state.ingredient)
        this.updatePuchaseIngredient(updateIngredients);
    }
    updatePuchaseIngredient = (updateIngredients) => {
        const sum = Object.keys(updateIngredients).map(igKey => {
            return updateIngredients[igKey]
        }).reduce((pre, current) => (pre + current), 0)
        console.log('ingredient sum= ' + sum)
        this.setState({
            purchaseable: sum > 0
        })
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
        
        const queryParams = [];
        
        for(let i in this.state.ingredient) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredient[i]))
        }
        queryParams.push('price='+ this.state.total_Price)
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?'+ queryString
        })
    }
    render() {
        const disableInfo = {
            ...this.state.ingredient
        }
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>ingredient can't be loaded</p> : <Spinner />
        console.log('burger render', this.props.ingredients)
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredient={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemove={this.props.onIngredientRemove}
                        disableInfo={disableInfo}
                        price={this.state.total_Price}
                        orderNow={this.state.purchaseable}
                        purchaseClick={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredient={this.state.ingredient}
                purchaseContinue={this.purchaseContinue}
                purchasCancel={this.purchasCancel}
                price={this.state.total_Price}
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
        ingredients: state.ingredients
    }
}

const mapDispatchToProps = dispatch=> {
    return {
        onIngredientRemove: (ingredientName)=>dispatch({type: actionTypes.REMOVE_INGREDIENTS, payload: {ingredientName: ingredientName}}),
        onIngredientAdd: (ingredientName)=>dispatch({type: actionTypes.ADD_INGREDIENTS, payload: {ingredientName: ingredientName}})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));