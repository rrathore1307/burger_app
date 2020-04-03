import React, { Component } from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import { connect } from 'react-redux'
import 'react-widgets/dist/css/react-widgets.css'
import './style.css'
import Button from '../Button/Button';
const data = {  // used to populate "account" reducer when "Load" is clicked
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'rajesh@yopmail.com',
    deliveryMethod: [
        { value: 'fastest', displayValue: 'Fastest' },
        { value: 'cheapest', displayValue: 'Cheapest' }]
}

const validate = values => {
    const errors = {}
    if (!values.name) {
        errors.name = 'Required'
    }else if(values.name.length > 20) {
        errors.name= 'Length error'
    }
    if (!values.email) {
        errors.email = 'Required'
    }
    return errors
}
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const asyncValidate = (values/*, dispatch */) => {
    return sleep(1000) // simulate server latency
        .then(() => {
            if (['raj', 'paul', 'george', 'ringo'].includes(values.firstName)) {
                throw { firstName: 'That username is taken' }
            }
        })
}
const autofill = (values) => {
    console.log(values)
    if (!values.name) {
        values.name = 'Rajesh'
    }
}
const options = [
    { value: 'fastest', displayValue: 'Fastest' },
    { value: 'cheapest', displayValue: 'Cheapest' }]
const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
            <input className='InputElement' {...input} type={type} placeholder={label} />
            <br />
            {touched && error && <span>{error}</span>}
    </div>
)

class ContactForm extends Component {
    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <Field name="name" component={renderField} type="text" label='Name' />
                </div>
                <div>
                    <Field name="email" component={renderField} type="email" label='Email' />
                </div>
                <div>
                    <Field name="street" component={renderField} type="text" label='Street' />
                </div>
                <div>
                    <Field name="zipcode" component={renderField} type="text" label='ZipCode' />
                </div>
                <div>
                    <Field name="deliveryMethod" component='select' >
                        <option></option>
                        {options.map((item, index) =>
                            <option value={item.value} key={item.value}>{item.displayValue}</option>)}
                    </Field>
                </div>
                <Button btnType='Success' >Order</Button>
            </form>
        );
    }
}

// Decorate the form component
ContactForm = reduxForm({
    form: 'contact', // a unique name for this form
    validate,
    asyncValidate,
    autofill,
    asyncBlurFields: ['name']
})(ContactForm);

ContactForm = connect(
    state => ({
        initialValues: data // pull initial values from account reducer
    })           // bind account loading action creator
)(ContactForm)

export default ContactForm;