import * as types from './actionTypes';
import { beginApiCall, apiCallError } from './apiStatusActions';
import { saveTokens, removeTokens } from '../../tools/localStorage';
import * as authenticationApi from '../../api/authenticationApi';
import { attatchBearerToken } from '../../tools/axiosClient';
import history from '../../history';
import { toast } from 'react-toastify';

const userLoginSuccess = (tokens) => {
  return { type: types.USER_LOGIN_SUCCESS, tokens };
};

const userLogoutSuccess = () => {
  return { type: types.USER_LOGOUT_SUCCESS };
};

export const login = (userLoginDetails) => {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authenticationApi
      .Login(userLoginDetails)
      .then((tokens) => {
        saveTokens(tokens);
        attatchBearerToken(tokens.access_token);
        dispatch(userLoginSuccess(tokens));
      })
      .catch((err) => {
        dispatch(apiCallError(err));
        throw err;
      });
  };
};

export const logout = () => {
  return function (dispatch) {
    removeTokens();
    history.push('/login');
    dispatch(userLogoutSuccess());
    toast.info('Logged out.');
  };
};
