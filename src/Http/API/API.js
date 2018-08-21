import { get, post } from '../Axios/ApiInvoke';

export const SaveOrder = (order) => {
    return post('/orders.json', order);
}