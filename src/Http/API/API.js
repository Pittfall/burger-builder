import { get, post } from '../Axios/ApiInvoke';

export const GetIngredients = () => {
    return get('/ingredients.json')
}

export const GetOrders = () => {
    return get('/orders.json');
}

export const SaveOrder = (order) => {
    return post('/orders.json', order);
}