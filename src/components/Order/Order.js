import React from 'react';
import './Order.css'
const Order =(props)=> {

    const ingredients = [];
    
    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            value: props.ingredients[ingredientName] 
        })
    }

    const ingredientJSX = ingredients.map(ingredient=>{
    return <span style={{
        textTransform: 'capitalize', 
        margin: '0 8px',
        display: 'inline-block',
        padding: '5px',
        border: '1px solid #ccc'
        }}
        key={ingredient.name}>{ingredient.name} ({ingredient.value})</span>
    })

    return (
        <div className='Order'>
        <p>Ingredients: {ingredientJSX}</p>
        <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
    )
}

export default Order;