import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

import * as actions from './actions';
import { authentication } from '../../../api';

const cookies = new Cookies();

export const login = (employeeId, password) => dispatch => {
  dispatch({type: actions.LOG_IN});
  axios.post(authentication.login, {
    employeeId,
    password
  })
    .then(res => {
      if(res.data.status === 200) {
        cookies.set('session', res.data.token, {
          path: '/',
          expires: 0
        });

        const myCookies = cookies.get('session');

        const tokenDecoded = jwt.decode(myCookies);

        dispatch({
          type: actions.CHECK_AUTHENTICATION,
          payload: {
            firstName: tokenDecoded.firstName,
            lastName: tokenDecoded.lastName,
            middleInitial: tokenDecoded.middleInitial,
            mode: tokenDecoded.mode,
            email: tokenDecoded.email
          }
        });
        dispatch({
          type: actions.AUTHENTICATION_DONE,
          payload: {
            success: true
          }
        })
      } else {
        dispatch({
          type: actions.AUTHENTICATION_DONE,
          payload: {
            success: false,
            message: res.data.message
          }
        })
      }
    })
};

export const register = (employeeId, email, password) => dispatch => {
  dispatch({type: actions.REGISTER});
  axios.post(authentication.registration, {mode: 3, employeeId, email, password})
    .then(res => {
      if(res.data.status === 200) {
        cookies.set('session', res.data.token, {
          path: '/',
          expires: 0
        });

        const myCookies = cookies.get('session');

        const tokenDecoded = jwt.decode(myCookies);

        dispatch({
          type: actions.CHECK_AUTHENTICATION,
          payload: {
            firstName: tokenDecoded.firstName,
            lastName: tokenDecoded.lastName,
            mode: tokenDecoded.mode,
            email: tokenDecoded.email
          }
        });
        dispatch({
          type: actions.AUTHENTICATION_DONE,
          payload: {
            success: true
          }
        })
      } else {
        console.log(res)
      }
    })
    .catch(e => {
      console.log(e)
    })
};

export const keepMeLoggedIn = v => dispatch => {
  dispatch({type: actions.KEEP_ME_LOGGED_IN_TOGGLE, v})
};