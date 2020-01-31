import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactDetail.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';
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

    checkValidity = (value, rules) => {
        let isValid =true;
        if(rules && rules.required) {
            isValid = value.trim() !=='' && isValid
        }

        if(rules && rules.minLength) {
            isValid = value.length > rules.minLength && isValid  
        }

        if(rules && rules.maxLength) {
            isValid = value.length < rules.maxLength && isValid  
        }
        return isValid
        
    }

    componentDidMount() {
        // console.log(this.props)
    }

    orderHandler = (event) => {
        event.preventDefault();

        let orderFormData ={};

        for(let formIdentifier in this.state.orderForm) {
            orderFormData[formIdentifier] = this.state.orderForm[formIdentifier].value;
        }

        // console.log(orderFormData);


        this.setState({
            loader: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: orderFormData
        }
        // console.log('order', order)
        axios.post('orders.json', order)
            .then(response => {
                this.setState({
                    loader: false,
                    purchasing: false
                })
                this.props.history.push('/')
                // console.log(response)
            })
            .catch(error => {
                this.setState({
                    loader: false,
                    purchasing: false
                })
                // console.log(error)
            })

        // console.log('form submited')
        // console.log(this.props)
    }
    handleInputChange=(event, identifier)=>{
        const updatedForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedForm[identifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[identifier] = updatedFormElement;
        let formIsValid =true;
        console.log('event ', updatedForm)
        for(let formElement in updatedForm) {
            console.log('form')
            formIsValid = updatedForm[formElement].valid && formIsValid;
        }

        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid
        })
        console.log(this.state.formIsValid);

    }
    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        console.log(formElementArray)
        let form = (
            <form>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        changed= {(event)=>this.handleInputChange(event, formElement.id)}
                        isInvalid= {!formElement.config.valid}
                        value={formElement.config.value}
                        touched={formElement.config.touched}
                        shouldValidate= {formElement.config.validation}
                        errorMsg = {formElement.config.errorMsg}
                        />
                ))}
                <Button btnType='Success' disabled={!this.state.formIsValid} clicked={(event) => { this.orderHandler(event) }}>Order</Button>
            </form>)
        if (this.state.loader) {
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

export default ContactDetail;