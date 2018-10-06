import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false
    });
  });

  it('should should store the token upon login', () => {
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false
    }, {type: actionTypes.AUTH_SUCCESS, token: 'someToken', userId: 'someUserId'})).toEqual({
      token: 'someToken',
      userId: 'someUserId',
      error: null,
      loading: false
    });
  });
});