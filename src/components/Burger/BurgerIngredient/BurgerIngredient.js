import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.css';

import {INGREDIENT} from '../../../Constants/Constants';

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type)
    {
        case ('bread-bottom'):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seeds1} />
                    <div className={classes.Seeds2} />
                </div>
            );
            break;
        case (INGREDIENT.SALAD):
            ingredient = <div className={classes.Salad}></div>;
            break;
        case (INGREDIENT.CHEESE):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case (INGREDIENT.MEAT):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case (INGREDIENT.BACON):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        default:
            ingredient = null;
            break;
    }

    return ingredient;
}

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default burgerIngredient;