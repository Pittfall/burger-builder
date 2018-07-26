import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = (props) => {
    const ingredientNames = Object.keys(props.ingredients);

    // Create an array with each ingredient 
    const transformedIngredients = ingredientNames.map(ingredientKey => {
        // Get an array of array of ingredients.  Example if salad has 2, it will create an array with 2 elements.
        return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
            return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
        });
    });

    // Get rid of ingredients that have no count.
    let finalIngredients = transformedIngredients.reduce((newArray, el) => {
        return newArray.concat(el);
    }, []);

    if (finalIngredients.length === 0)
    {
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