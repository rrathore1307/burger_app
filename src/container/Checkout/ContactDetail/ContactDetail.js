import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import './ContactDetail.css';
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'
class ContactDetail extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    changeHandler=(e)=>{
        
    }

    componentDidMount() {
        console.log(this.props)
    }

    orderHandler=(event)=>{
        event.preventDefault();

        this.setState({
            loader: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.total_Price,
            customer: {
                name: 'Rajesh Rathore',
                address: {
                    street: 'Test 123',
                    zipcode: '452001',
                    country: 'India'
                },
                email: 'xyz@yopmail.com'
            },
            deliverymethod: 'Fastest'
        }

        axios.post('orders.json', order)
            .then(response => {
                this.setState({
                    loader: false,
                    purchasing: false
                })
                this.props.history.push('/')
                console.log(response)
            })
            .catch(error => {
                this.setState({
                    loader: false,
                    purchasing: false
                })
                console.log(error)
            })

        console.log('form submited')
        console.log(this.props)
    }

    render() {
        let form = (
        <form>
            <input type='text' className='inputField' value ={this.state.name} placeholder='Enter your name' onChange={(event)=>{this.changeHandler(event)}} />
            <input type='email'className='inputField' value ={this.state.name} placeholder='Enter your email' onChange={(event)=>{this.changeHandler(event)}} />
            <input type='text' className='inputField' value ={this.state.name} placeholder='Enter your street' onChange={(event)=>{this.changeHandler(event)}} />
            <input type='text' className='inputField' value ={this.state.name} placeholder='Enter your postalCode' onChange={(event)=>{this.changeHandler(event)}} />
            <Button btnType='Success' clicked={(event)=>{this.orderHandler(event)}}>Order</Button>
        </form>)
        if(this.state.loader) {
            form = <Spinner />
        }
        return(
            <div className='contactDiv'>
            Please fill Contact form
            {form}
        </div>
        )
    }
}

export default ContactDetail;