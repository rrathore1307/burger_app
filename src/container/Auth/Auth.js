import React, {useState, useEffect } from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import './Auth.css'
import * as actionType from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../Shared/utility'
const Auth =(props)=> {

    const [formState, setFormState] = useState({

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
    })

    useEffect(()=>{
        if(!props.building && props.redirectPath !== '/')
        props.onSetRedirectPath();
    },[])

    const [formIsValidState, setFormsIsvalidState] = useState({
        formIsValid: false
    })

    const [isSignupState, setIsSignupState] = useState({
        isSignup: false
    })

    const swithToSignup = () => {
        setIsSignupState({
            isSignup: !isSignupState.isSignup
        })

    }
    const handleInputChange = (event, identifier) => {
        const updatedForm = {
            ...formState.controls
        }

        const updatedFormElement = {
            ...updatedForm[identifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidity(event.target.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[identifier] = updatedFormElement;
        let formIsValid = true;
        for (let formElement in updatedForm) {
            console.log('form')
            formIsValid = updatedForm[formElement].valid && formIsValid;
        }

        setFormState({
            controls: updatedForm,
        })

        setFormsIsvalidState({
            formIsValid: formIsValid
        })
        // console.log(this.state.formIsValid);
    }

    const orderHandler = (event) => {
        event.preventDefault();
        props.onAuth(formState.controls.email.value, formState.controls.password.value, isSignupState.isSignup)
    }

        let formElementArray = [];
        let errorMessage = ''
        for (let key in formState.controls) {
            formElementArray.push({
                id: key,
                config: formState.controls[key]
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
                <Button btnType='Success' disabled={!formIsValidState.formIsValid} clicked={(event) => { orderHandler(event) }}>Submit</Button>
            </form>)
        if (props.loading) {
            form = <Spinner />
        }
        if (props.error) {
            errorMessage = props.error.message
        }
        let authRedirect = null;
        if(props.isAuth) {
            authRedirect= <Redirect to={props.redirectPath} />
        }
        return (
            <div className='Auth'>
                <span className='errorMsg'>
                    {errorMessage}
                </span>
                {authRedirect}
                {/* Please fill Contact form */}
                {form}
                <Button btnType='Danger' clicked={() => swithToSignup()}>Switch to {!isSignupState.isSignup ? 'Signup' : 'Signin'}</Button>
            </div>
        )
}

const mapStateToProps = state => {
    return {
        loading: state.authReducer.loading,
        error: state.authReducer.error,
        isAuth: state.authReducer.token !== null,
        redirectPath: state.authReducer.redirectPath,
        building: state.burgerReducer.building
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actionType.auth(email, password, isSignup)),
        onSetRedirectPath: () => dispatch(actionType.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);