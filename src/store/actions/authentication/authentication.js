import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt from 'jsonwebtoken';

import * as actions from './actions';
import { authentication } from '../../../api';
import { initializeSocket } from "../../../socket";

const cookies = new Cookies();

export const chooseRole = role => dispatch => {
  let myCookies, tokenDecoded;

  switch(role) {
    case 7: {
      myCookies = cookies.get('session2');
      tokenDecoded = jwt.decode(myCookies);

      cookies.remove('session', {
        path: '/'
      });
      cookies.remove('session2', {
        path: '/'
      });
      cookies.remove('session3', {
        path: '/'
      });

      cookies.set('session', myCookies, {
        path: '/',
        expires: 0
      });

      break;
    }

    case 3: {
      myCookies = cookies.get('session3');
      tokenDecoded = jwt.decode(myCookies);

      cookies.remove('session', {
        path: '/'
      });
      cookies.remove('session2', {
        path: '/'
      });
      cookies.remove('session3', {
        path: '/'
      });

      cookies.set('session', myCookies, {
        path: '/',
        expires: 0
      });

      break;
    }
  }

  dispatch({
    type: actions.CHECK_AUTHENTICATION,
    payload: {
      firstName: tokenDecoded.firstName,
      lastName: tokenDecoded.lastName,
      middleInitial: tokenDecoded.middleInitial,
      mode: tokenDecoded.mode,
      email: tokenDecoded.email,
      role: tokenDecoded.role,
      employeeId: tokenDecoded.employeeId
    }
  });
  const socket = initializeSocket();
  socket.emit('login', {
    employeeId: tokenDecoded.employeeId
  })
};

export const login = (employeeId, password) => dispatch => {
  dispatch({type: actions.LOG_IN});
  axios.post(authentication.login, {
    employeeId,
    password
  })
    .then(res => {
      if(res.data.status === 200) {
        if(res.data.mode === 5) {
          cookies.set('session', res.data.token1, {
            path: '/',
            expires: 0
          });

          cookies.set('session2', res.data.token2, {
            path: '/',
            expires: 0
          });

          cookies.set('session3', res.data.token3, {
            path: '/',
            expires: 0
          });
        } else {
          cookies.set('session', res.data.token, {
            path: '/',
            expires: 0
          });
        }

        const myCookies = cookies.get('session');

        const tokenDecoded = jwt.decode(myCookies);

        dispatch({
          type: actions.CHECK_AUTHENTICATION,
          payload: {
            firstName: tokenDecoded.firstName,
            lastName: tokenDecoded.lastName,
            middleInitial: tokenDecoded.middleInitial,
            mode: tokenDecoded.mode,
            email: tokenDecoded.email,
            role: tokenDecoded.role,
            employeeId: tokenDecoded.employeeId
          }
        });
        dispatch({
          type: actions.AUTHENTICATION_DONE,
          payload: {
            success: true
          }
        });
      } else if(res.data.status === 403) {
        dispatch({
          type: actions.AUTHENTICATION_DONE,
          payload: {
            success: false,
            message: res.data.message,
            notYetRegisteredEmployeeId: res.data.employeeId
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

export const logout = () => dispatch => {
  cookies.remove('session', {
    path: '/'
  });
  dispatch({type: actions.LOG_OUT});
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

export const reset = () => dispatch => {
  dispatch({type: actions.RESET})
};

export const keepMeLoggedIn = v => dispatch => {
  dispatch({type: actions.KEEP_ME_LOGGED_IN_TOGGLE, v})
};