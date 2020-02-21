import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactDetail.css';
// import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
import * as actionType from '../../../store/actions/index'
import { connect } from 'react-redux';
import { updatedObject, checkValidity } from '../../../Shared/utility'
class ContactDetail extends Component {
    state = {
        formIsValid: false,
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

    }

    orderHandler = (event) => {
        event.preventDefault();

        let orderFormData = {};

        for (let formIdentifier in this.state.orderForm) {
            orderFormData[formIdentifier] = this.state.orderForm[formIdentifier].value;
        }



        this.setState({
            loader: true
        })
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: orderFormData,
            userId: this.props.userId
        }

        this.props.purchaseStart(order, this.props.token);
    }

    handleInputChange = (event, identifier) => {
        const updatedFormElement = updatedObject(this.state.orderForm[identifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[identifier].validation),
            touched: true
        }
        )

        const updatedForm = updatedObject(this.state.orderForm, {
            [identifier]: updatedFormElement
        })
        let formIsValid = true;
        for (let formElement in updatedForm) {
            console.log('form')
            formIsValid = updatedForm[formElement].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid
        })

    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        // console.log(formElementArray)
        let form = (
            <form>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        changed={(event) => this.handleInputChange(event, formElement.id)}
                        isInvalid={!formElement.config.valid}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        errorMsg={formElement.config.errorMsg}
                    />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} clicked={(event) => { this.orderHandler(event) }}>Order</Button>
            </form>)
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className='contactDiv'>
                Please fill Contact form
            {form}
            </div>
        )
    }
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