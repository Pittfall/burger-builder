import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const orderData = Object.keys(props.orderData.ingredients).map(key => {
        return (
            <span className={classes.Ingredient} key={key}>
                {props.orderData.ingredients[key].name + '(' + props.orderData.ingredients[key].quantity + ') '}
            </span>
        )
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {orderData}</p>
            <p>Price: <strong>CAD {props.orderData.price.toFixed(2)}</strong></p>
        </div>
    );
}

export default order;