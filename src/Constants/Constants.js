const INGREDIENT = Object.freeze({
    SALAD: 'salad',
    CHEESE: 'cheese',
    MEAT: 'meat',
    BACON: 'bacon'
});

const INGREDIENT_NAMES = Object.freeze({
    [INGREDIENT.SALAD]: 'Salad',
    [INGREDIENT.CHEESE]: 'Cheese',
    [INGREDIENT.MEAT]: 'Meat',
    [INGREDIENT.BACON]: 'Bacon'
});

const INGREDIENT_PRICE = Object.freeze({
    [INGREDIENT.SALAD]: 0.5,
    [INGREDIENT.CHEESE]: 0.4,
    [INGREDIENT.MEAT]: 1.3,
    [INGREDIENT.BACON]: 1
});

const BASE_BURGER_PRICE = 4;

export { INGREDIENT, INGREDIENT_NAMES, INGREDIENT_PRICE, BASE_BURGER_PRICE };