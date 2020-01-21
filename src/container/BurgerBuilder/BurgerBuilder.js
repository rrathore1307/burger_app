import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.6,
    meat: 1.2,
    cheese: 0.8
}
class BurgerBuilder extends Component {

    state={
        ingredient: {
            meat:0,
            salad:0,
            bacon:0,
            cheese:0
        },
        total_Price: 4,
        purchaseable: false,
        purchasing: false
    }

    addIngrediet=(type)=>{
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount +1;
        const updateIngredients = {
            ...this.state.ingredient
        }
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.total_Price;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            total_Price: newPrice,
            ingredient: updateIngredients
        })
        console.log(this.state.ingredient)
        this.updatePuchaseIngredient(updateIngredients);
    }
    removeIngredient=(type)=>{
        const oldCount = this.state.ingredient[type];
        if(oldCount == 0) {
            return ;
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
    updatePuchaseIngredient=(updateIngredients)=>{
        const sum = Object.keys(updateIngredients).map(igKey=>{
            return updateIngredients[igKey]
        }).reduce((pre,current)=>(pre + current),0)
        console.log('ingredient sum= '+sum)
        this.setState({
            purchaseable: sum > 0
        })
    }

    purchaseHandler=()=>{
        console.log('purchase')
        this.setState({
            purchasing: true
        })
    }
    purchasCancel=()=>{
        this.setState({
            purchasing: false
        })
    }
    purchaseContinue=()=>{
        alert('continue')
    }
    render() {
        const disableInfo = {
            ...this.state.ingredient
        }
        for(let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0;
        }
        return(
            <Aux>
                {this.state.purchasing && <Modal show={this.state.purchasing} modalClosed={this.purchasCancel}>
                    <OrderSummary 
                        ingredient={this.state.ingredient}
                        purchaseContinue= {this.purchaseContinue}
                        purchasCancel = {this.purchasCancel}
                        price ={this.state.total_Price}
                        />
                </Modal>}
                <Burger ingredient={this.state.ingredient} />
                <BuildControls 
                    ingredientAdded = {this.addIngrediet}
                    ingredientRemove = {this.removeIngredient}
                    disableInfo ={disableInfo}
                    price= {this.state.total_Price}
                    orderNow={this.state.purchaseable}
                    purchaseClick = {this.purchaseHandler}
                />
            </Aux>
        )
    }
}
export default BurgerBuilder;