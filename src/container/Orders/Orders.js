import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actionTypes from '../../store/actions/index'
class Orders extends Component {
    state = {
        orders: [],
        loading: false
    }
    componentDidMount() {
        this.props.fetchOrders();
        // axios.get('/orders.json')
        // .then(res=>{
        //     console.log(res)
        //     const fetchOrders =[]
        //     for(let key in res.data) {
        //         fetchOrders.push({
        //             ...res.data[key],
        //             id: key
        //         })
        //     }
        //     this.setState({
        //         loading: false,
        //         orders: fetchOrders
        //     })
        //     console.log(this.state)
        // })
        // .catch(error=> {
        //     console.log(error);
        //     this.setState({
        //         loading: false
        //     })
        // })
    }

    render() {
        let order = this.props.orders.map(order=>(
            <Order key = {order.id} ingredients={order.ingredients} price={order.price} />
        ))
        if(this.props.loading) {
            order = <Spinner />
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
}
const mapDispatchToProps= dispatch=> {
    return {
        fetchOrders: ()=>dispatch(actionTypes.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, axios));