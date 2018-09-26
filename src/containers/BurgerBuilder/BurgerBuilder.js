import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
// import { GetIngredients } from '../../Http/API/API';
import { addIngredient, removeIngredient } from '../../store/actions/burgerBuilder';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // GetIngredients()
        //     .then(response => {
        //         const ingredients = response.data;
        //         Object.keys(ingredients).forEach(key => { 
        //             ingredients[key].quantity = 0;
        //         });

        //         this.setState({ingredients: ingredients});
        //     })
        //     .catch(error =>{
        //         this.setState({error: true});
        //     });
    }

    updatePurchasableState () {
        // Go through ingredients and add the total amount of ingredients added.
        const sum = Object.keys(this.props.ingredients).map(igKey => {
            return this.props.ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el.quantity;
        }, 0);

        return sum > 0;
    }

    purchaseHandler () {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    puchaseContinue = () => {
        this.props.history.push({ pathname: '/checkout'});
    }

    render () {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key].quantity <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />; 
        if (this.props.ingredients) {
            burger = (
                    <Fragment>
                        <Burger ingredients={this.props.ingredients} />
                        <p className={classes.Price}>Current Price: ${this.props.price.toFixed(2)}</p>
                        <BuildControls 
                            ingredients={this.props.ingredients}
                            ingredientAdded={this.props.onAddIngredientHandler} 
                            ingredientRemoved={this.props.onRemoveIngredientHandler} 
                            disabled={disabledInfo}
                            purchasable={this.updatePurchasableState()}
                            order={this.purchaseHandler.bind(this)} />
                    </Fragment>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredientHandler: (ingredient) => dispatch(addIngredient(ingredient)),
        onRemoveIngredientHandler: (ingredient) => dispatch(removeIngredient(ingredient))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);