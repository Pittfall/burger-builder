import axios from 'axios';
import HandleError from './HandleError';
import { BASE_URL, HTTP_HEADERS } from './Config';

axios.defaults.baseURL = BASE_URL;

// Don't need to set these this time.
axios.defaults.headers.common['Accept'] = HTTP_HEADERS.ACCEPT;
axios.defaults.headers.post['Content-Type'] = HTTP_HEADERS.CONTENT_TYPE;

// HTTP GET
export const get = (path) => {
    return new Promise((resolve, reject) => {
        axios.get(path)
            .then(response => { resolve(response) })
            .catch(error => { reject(HandleError(error)) });
    });
};

export const post = (path, data) => {
    return new Promise((resolve, reject) => {
        axios.post(path, data)
            .then(response => { resolve(response) })
            .catch(error => { reject(HandleError(error)) });
    });
};

export const patch = (path, data) => {
    return new Promise((resolve, reject) => {
      axios.patch(path, data)
        .then(response => { resolve(response) })
        .catch(error => { reject(handleError(error)) });
    });
  };

export const del = (path) => {
    return new Promise((resolve, reject) => {
        axios.delete(path)
            .then(response => { resolve(response) })
            .catch(error => { reject(HandleError(error)) });
    });
};