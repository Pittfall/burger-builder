import React, { Fragment } from 'react';

import {INGREDIENT_NAMES} from '../../../Constants/Constants';
import Button from '../../UI/Button/Button';

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
            <p>Total Price: <strong>${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Fragment>
    )
};

export default orderSummary;