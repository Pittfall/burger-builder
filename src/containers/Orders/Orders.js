import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';

import { GetOrders } from '../../Http/API/API';

class Orders extends Component {
    state = {
        orders: null
    }

    componentDidMount () {
        GetOrders()
        .then (response => {
            this.setState({orders: response.data});
        })
        .catch (error => {
            alert(error);
        });
    }

    render () {
        let userOrders = <Spinner />

        if (this.state.orders) {
            userOrders = Object.keys(this.state.orders).map(key => {
                return (
                    <Order key={key} orderData={this.state.orders[key]} />
                );
            });
        }

        return (
            <div className={classes.Orders}>
                {userOrders}
            </div>
        );
    }
}

export default Orders;