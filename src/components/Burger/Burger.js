import React from 'react';
import './Burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
const Burger = (props) => {
    console.log('burger builder',props.ingredient)
    let transformedIngredient = Object.keys(props.ingredient)
        .map(igKey=>{
            return [...Array(props.ingredient[igKey])]
            .map((_,i)=>{
                return <BurgerIngredient key={igKey + i} type={igKey} />
            })
        })
        .reduce((arr,el)=>{
            return arr.concat(el)
        },[])
    console.log(transformedIngredient)
    if(transformedIngredient.length===0) {
        transformedIngredient = <p>Please adding some ingredient</p>
    }
    return (
        <div className='Burger'>
            <BurgerIngredient type='bread-top' />
                {transformedIngredient}
            <BurgerIngredient type='bread-bottom' />
        </div>
    )
}
export default Burger;