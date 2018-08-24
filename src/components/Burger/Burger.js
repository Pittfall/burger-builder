import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    // Create an array with each ingredient
    let finalIngredients = [];
    Object.keys(props.ingredients).forEach(ingredientKey => {
        for (let i = 0; i < props.ingredients[ingredientKey].quantity; ++i) {
            finalIngredients.push(<BurgerIngredient key={ingredientKey + i} type={ingredientKey} />);
        }
    });
    
    if (finalIngredients.length === 0) {
        finalIngredients = <p>Please start adding ingredients!</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {finalIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );  
};

export default burger;