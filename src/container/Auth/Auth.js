import React, { Component } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import './Auth.css'
import * as actionType from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                errorMsg: 'Please enter valid email!',
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                errorMsg: 'Please enter password',
                touched: false
            }
        },
        formIsValid: false,
        isSignup: false
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules && rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules && rules.minLength) {
            isValid = value.length > rules.minLength && isValid
        }

        if (rules && rules.maxLength) {
            isValid = value.length < rules.maxLength && isValid
        }
        return isValid

    }
    swithToSignup = () => {
        this.setState((preState) => {
            return {
                isSignup: !preState.isSignup
            }
        })
    }
    handleInputChange = (event, identifier) => {
        const updatedForm = {
            ...this.state.controls
        }

        const updatedFormElement = {
            ...updatedForm[identifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(event.target.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[identifier] = updatedFormElement;
        let formIsValid = true;
        // console.log('event ', updatedForm)
        for (let formElement in updatedForm) {
            console.log('form')
            formIsValid = updatedForm[formElement].valid && formIsValid;
        }

        this.setState({
            controls: updatedForm,
            formIsValid: formIsValid
        })
        // console.log(this.state.formIsValid);
    }

    orderHandler = (event) => {
        event.preventDefault();


        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup)
        // console.log('[Auth]',order)

        // this.props.purchaseStart(order);
        // axios.post('orders.json', order)
        //     .then(response => {
        //         this.setState({
        //             loader: false,
        //             purchasing: false
        //         })
        //         this.props.history.push('/')
        //         // console.log(response)
        //     })
        //     .catch(error => {
        //         this.setState({
        //             loader: false,
        //             purchasing: false
        //         })
        //         // console.log(error)
        //     })

        // console.log('form submited')
        // console.log(this.props)
    }

    render() {
        let formElementArray = [];
        let errorMessage = ''
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
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
                <Button btnType='Success' disabled={!this.state.formIsValid} clicked={(event) => { this.orderHandler(event) }}>Submit</Button>
            </form>)
        if (this.props.loading) {
            form = <Spinner />
        }
        if (this.props.error) {
            errorMessage = this.props.error.message
        }
        return (
            <div className='Auth'>
                <span className='errorMsg'>
                    {errorMessage}
                </span>
                {/* Please fill Contact form */}
                {form}
                <Button btnType='Danger' clicked={() => this.swithToSignup()}>Switch to {!this.state.isSignup ? 'Signup' : 'Signin'}</Button>
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionType.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);