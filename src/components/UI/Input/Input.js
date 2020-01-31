import React from 'react';
import './Input.css'
const Input = (props) => {
    let InputElement = null;
    let classes =['InputElement']
    if(props.isInvalid && props.touched && props.shouldValidate) {
        classes.push('Invalid')
    }

    switch (props.elementType) {
        case ('input'):
            InputElement = <input
                className={classes.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />
            break;
        case ('textarea'):
            InputElement = <textarea
                className='InputElement'
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />
            break;
        case ('select'):
            InputElement = (<select
                className={classes.join(' ')}
                onChange={props.changed}
                value={props.value} >
                {props.elementConfig.options.map(item => (
                    <option key={item.value} value={item.value}>{item.displayValue}</option>
                ))}
            </select>)
            break;
        default:
            InputElement = <textarea
                className={classes.join(' ')}
                {...props.elementConfig}
                onChange={props.changed}
                value={props.value} />
            break;

    }
    return (
        <div className='Input'>
            <label className="Label">{props.label}</label>
            {InputElement}
        </div>
    )
}

export default Input;