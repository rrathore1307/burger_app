import React from 'react'
import BuildControl from './BuildControl/BuildControl'
import './BuildControls.css'
const controls =[
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
]
const BuildControls = (props) => (
    <div className='BuildControls'>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={()=>props.ingredientAdded(ctrl.type)}
                remove = {()=>props.ingredientRemove(ctrl.type)}
                disable = {props.disableInfo[ctrl.type]}
                />
        ))}
        <button className='OrderButton' disabled={!props.orderNow}>Order Now</button>
    </div>
)
export default BuildControls