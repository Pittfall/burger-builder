import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        // Ingredients should not be build like this but whatever....
        ingredients: {
            bacon : {
                name : 'Bacon',
                price : 1,
                quantity: 0
              },
              cheese : {
                name : 'Cheese',
                price : 0.8,
                quantity: 0
              },
              meat : {
                name : 'Meat',
                price : 1.3,
                quantity: 0
              },
              salad : {
                name : 'Salad',
                price : 0.5,
                quantity: 0
              }
        }
    }

    componentDidMount () {
        const params = new URLSearchParams(this.props.location.search);

        const localIngredients = this.state.ingredients;

        for (const param of params) {
            const ing = localIngredients[param[0]];
            localIngredients[param[0]].quantity = +param[1];
        }

        this.setState({ingredients: localIngredients});
    }

    continueHandler = () => {

    }

    cancelHandler = () => {
        this.props.history.push({pathname: "/"});
    }

    render () {
        return (
            <div>
                <CheckoutSummary ingredients={this.state.ingredients} continue={this.continueHandler} cancel={this.cancelHandler} />
            </div>
        );
    }
}

export default Checkout;