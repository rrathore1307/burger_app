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
        console.log(ingredient.name)
    return <span style={{
        textTransform: 'capitalize', 
        margin: '0 8px',
        display: 'inline-block',
        padding: '5',
        border: '1px solid #ccc'
        }}
        key={ingredient.name}>{ingredient.name} ({ingredient.value})</span>
    })

    return (
        <div className='Order'>
        <p>Ingredients: {ingredientJSX}</p>
        <p>Price: <strong>USD 4.22</strong></p>
    </div>
    )
}

export default Order;