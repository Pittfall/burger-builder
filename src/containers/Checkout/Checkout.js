import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            bacon : {
                name : 'Bacon',
                price : 1,
                quantity: 1
              },
              cheese : {
                name : 'Cheese',
                price : 0.8,
                quantity: 1
              },
              meat : {
                name : 'Meat',
                price : 1.3,
                quantity: 1
              },
              salad : {
                name : 'Salad',
                price : 0.5,
                quantity: 1
              }
        }
    }

    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;