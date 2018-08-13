import React, { Component, Fragment } from 'react';

import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import {INGREDIENT, INGREDIENT_PRICE, BASE_BURGER_PRICE} from '../../Constants/Constants'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            [INGREDIENT.SALAD]: 0,
            [INGREDIENT.MEAT]: 0,
            [INGREDIENT.CHEESE]: 0,
            [INGREDIENT.BACON]: 0
        },
        totalPrice: BASE_BURGER_PRICE,
        purchasable: false,
        purchasing: false
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]++;

        let newPrice = this.state.totalPrice;
        newPrice += INGREDIENT_PRICE[type];

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type]--;

        if (updatedIngredients[type] < 0) {
            return;
        }

        let newPrice = this.state.totalPrice;
        newPrice -= INGREDIENT_PRICE[type];

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    }

    updatePurchasableState (ingredients) {
        // Go through ingredients and add the total amount of ingredients added.
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable: sum > 0});
    }

    purchaseHandler () {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    puchaseContinue = () => {
        alert('You Continue!');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.puchaseContinue} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <p className={classes.Price}>Current Price: ${this.state.totalPrice.toFixed(2)}</p>
                <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        order={this.purchaseHandler.bind(this)} />
            </Fragment>

        );
    }
}

export default BurgerBuilder;