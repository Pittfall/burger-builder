import { get, post } from '../Axios/ApiInvoke';

export const GetIngredients = () => {
    return get('https://react-my-burger-42e0f.firebaseio.com/ingredients.json')
}

export const GetOrders = (token) => {
    return get('https://react-my-burger-42e0f.firebaseio.com/orders.json?auth=' + token);
}

export const SaveOrder = (token, order) => {
    return post('https://react-my-burger-42e0f.firebaseio.com/orders.json?auth=' + token, order);
}

export const SignUpNewUser = authData => {
    return post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB1vO_0DSXCatZLN70-njR6hg_rjz4JATA', authData);
}

export const SignInUser = authData => {
    return post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB1vO_0DSXCatZLN70-njR6hg_rjz4JATA', authData);
}