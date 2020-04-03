import React, {useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactDetail.css';
// import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import * as actionType from '../../../store/actions/index'
import { connect } from 'react-redux';
import { updatedObject, checkValidity } from '../../../Shared/utility'
import ContactForm from '../../../components/UI/ReduxForm/ContactForm';
import MaterialUiForm from '../../../components/UI/ReduxForm/materialUIForm';
const ContactDetail =props=> {
    const [formIsValidState, setFormIsValid] = useState(false)
    const [ordeFormState, setOrderForm] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 7
                },
                errorMsg: 'Please enter valid name!',
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                errorMsg: 'Please enter valid email!',
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                errorMsg: 'Please enter valid street!',
                valid: false,
                touched: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zipcode'
                },
                value: '',
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                errorMsg: 'Please enter valid country name!',
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }]
                },
                value: 'fastest',
                touched: false,
                valid: true,
            }
        }

    })


    const orderHandler = (event) => {
        event.preventDefault();

        let orderFormData = {};

        for (let formIdentifier in ordeFormState.orderForm) {
            orderFormData[formIdentifier] = ordeFormState.orderForm[formIdentifier].value;
        }

        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: orderFormData,
            userId: props.userId
        }

        props.purchaseStart(order, props.token);
    }

    const handleSubmit = (values) => {
        // Do something with the form values
        // event.preventDefault();
        console.log(values);
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: values,
            userId: props.userId
        }

        props.purchaseStart(order, props.token);
      }
    const handleInputChange = (event, identifier) => {
        const updatedFormElement = updatedObject(ordeFormState.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, ordeFormState.orderForm[identifier].validation),
            touched: true
        }
        )

        const updatedForm = updatedObject(ordeFormState.orderForm, {
            [identifier]: updatedFormElement
        })
        let formIsValid = true;
        for (let formElement in updatedForm) {
            formIsValid = updatedForm[formElement].valid && formIsValid;
        }

        setOrderForm({orderForm: updatedForm})
        setFormIsValid(formIsValid)

    }

        let formElementArray = [];
        for (let key in   ordeFormState.orderForm) {
            formElementArray.push({
                id: key,
                config:  ordeFormState.orderForm[key]
            })
        }
        // console.log(formElementArray)
        let form = (
            <form>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        changed={(event) => handleInputChange(event, formElement.id)}
                        isInvalid={!formElement.config.valid}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        errorMsg={formElement.config.errorMsg}
                    />
                ))}
                <Button btnType='Success' disabled={!formIsValidState} clicked={(event) => { orderHandler(event) }}>Order</Button>
            </form>)
        if (props.loading) {
            form = <Spinner />
        }
        return (
            <div className='contactDiv'>
                Please fill Contact form
            {/* {form} */}
            <ContactForm onSubmit={handleSubmit}  />
            {/* <MaterialUiForm onSubmit={handleSubmit} /> */}
            </div>
        )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerReducer.ingredients,
        price: state.burgerReducer.totalPrice,
        loading: state.orderReducer.loading,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        purchaseStart: (orderData, token) => dispatch(actionType.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetail);