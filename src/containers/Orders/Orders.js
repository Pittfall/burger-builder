import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Orders.css';
import { initOrders } from '../../store/actions/order';

class Orders extends Component {
    componentDidMount () {
        this.props.onInitOrders(this.props.token, this.props.userId);
    }

    render () {
        let userOrders = <Spinner />

        if (!this.props.loading) {
            if (this.props.error) {
                userOrders = <p>{this.props.error}</p>
            } else {
                userOrders = this.props.orders.map(order => {
                    return (
                        <Order key={order.id} orderData={order} />
                    );
                });
            }
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
        loading: state.orderReducer.loading,
        error: state.orderReducer.error,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitOrders: (token, userId) => dispatch(initOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);