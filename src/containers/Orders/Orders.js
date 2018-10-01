import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';
import { initOrders } from '../../store/actions/order';

class Orders extends Component {
    componentDidMount () {
        this.props.onInitOrders();
    }

    render () {
        let userOrders = <Spinner />

        if (!this.props.loading) {
            userOrders = this.props.orders.map(order => {
                return (
                    <Order key={order.id} orderData={order} />
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

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: () => dispatch(initOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);