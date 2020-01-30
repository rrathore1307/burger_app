import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    componentDidMount() {
        axios.get('/orders.json')
        .then(res=>{
            console.log(res)
            const fetchOrders =[]
            for(let key in res.data) {
                fetchOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({
                loading: false,
                orders: fetchOrders
            })
            console.log(this.state)
        })
        .catch(error=> {
            console.log(error);
            this.setState({
                loading: false
            })
        })
    }

    render() {
        let order = this.state.orders.map(order=>(
            <Order key = {order.id} ingredients={order.ingredients}  />
        ))
        if(this.state.loading) {
            order = <Spinner />
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

export default WithErrorHandler(Orders, axios);