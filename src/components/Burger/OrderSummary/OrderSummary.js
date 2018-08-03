import React, { Fragment } from 'react';

import {INGREDIENT_NAMES} from '../../../Constants/Constants';

const orderSummary = (props) => {
    const ingredientSummary =  Object.keys(props.ingredients).map(igkey => {
        return (
            <li key={igkey}>
                {INGREDIENT_NAMES[igkey]}: {props.ingredients[igkey]}
            </li>
        );
    });

    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Fragment>
    )
};

export default orderSummary;