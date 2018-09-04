import React, { Component, Fragment } from 'react';

import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import {BASE_BURGER_PRICE} from '../../Constants/Constants'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { SaveOrder, GetIngredients } from '../../Http/API/API';

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: BASE_BURGER_PRICE,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        GetIngredients()
            .then(response => {
                const ingredients = response.data;
                Object.keys(ingredients).forEach(key => { 
                    ingredients[key].quantity = 0;
                });

                this.setState({ingredients: ingredients});
            })
            .catch(error =>{
                this.setState({error: true});
            });
    }

    addIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type].quantity++;

        let newPrice = this.state.totalPrice;
        newPrice += this.state.ingredients[type].price;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type].quantity--;

        if (updatedIngredients[type].quantity < 0) {
            return;
        }

        let newPrice = this.state.totalPrice;
        newPrice -= this.state.ingredients[type].price;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchasableState(updatedIngredients);
    }

    updatePurchasableState (ingredients) {
        // Go through ingredients and add the total amount of ingredients added.
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el.quantity;
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
        const checkoutIngredients = [];

        for (var i in this.state.ingredients) {
            checkoutIngredients.push(i + '=' + this.state.ingredients[i].quantity);
        }

        this.props.history.push({ pathname: '/checkout', search: checkoutIngredients.join("&") });
        // this.setState({loading: true});

        // const ingredientWithQuantity = Object.keys(this.state.ingredients).reduce((obj, key) => {
        //     obj[key] = this.state.ingredients[key].quantity;
        //     return obj;
        // }, {});

        // const order = {
        //     ingredients: ingredientWithQuantity,
        //     price: this.state.totalPrice, // Typically this is calculated on the server.
        //     customer: {
        //         name: "Andrew",
        //         age: 30,
        //         email: "Andrew@Rusu.com",
        //     },
        //     deliverMethod: "Fast"
        // }

        // SaveOrder(order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //         alert(error); // Temporary alert.
        //     });
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />; 
        if (this.state.ingredients) {
            burger = (
                    <Fragment>
                        <Burger ingredients={this.state.ingredients} />
                        <p className={classes.Price}>Current Price: ${this.state.totalPrice.toFixed(2)}</p>
                        <BuildControls 
                            ingredients={this.state.ingredients}
                            ingredientAdded={this.addIngredientHandler} 
                            ingredientRemoved={this.removeIngredientHandler} 
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            order={this.purchaseHandler.bind(this)} />
                    </Fragment>
            );

            orderSummary = <OrderSummary 
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.puchaseContinue} />;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

export default BurgerBuilder;