import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import classes from './BurgerBuilder.css'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import { initIngredients, addIngredient, removeIngredient } from '../../store/actions/burgerBuilder';
import { purchaseInit } from '../../store/actions/order';

export class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false
    }

    componentDidMount () {
        if (!this.props.ingredients) {
            this.props.onInitIngredients();
        }
    }

    updatePurchasableState () {
        // Go through ingredients and add the total amount of ingredients added.
        const sum = Object.keys(this.props.ingredients).map(igKey => {
            return this.props.ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el.quantity;
        }, 0);

        return sum > 0 || !this.props.isAuth;
    }

    purchaseHandler () {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push({ pathname: '/auth'});
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    puchaseContinue = () => {
        this.props.onInitPurchase();
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

        let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />; 
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
                            order={this.purchaseHandler.bind(this)}
                            isAuth={this.props.isAuth} />
                    </Fragment>
            );

            orderSummary = <OrderSummary 
                ingredients={this.props.ingredients}
                price={this.props.price}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.puchaseContinue} />;
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
        ingredients: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        isAuth: state.authReducer.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitIngredients: () => dispatch(initIngredients()),
        onAddIngredientHandler: (ingredient) => dispatch(addIngredient(ingredient)),
        onRemoveIngredientHandler: (ingredient) => dispatch(removeIngredient(ingredient)),
        onInitPurchase: () => dispatch(purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);