import * as service from '../services/userService';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {},
  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },
  },

  effects: {
    *redirectToLogin({ payload }, { call, put }) {
      yield put(routerRedux.push('/login'));
    },

    *login({ payload }, { put, call }) {
      const data = yield call(service.login, payload);
      yield put({
        type: 'reduce',
        payload: data,
      });

      yield put(routerRedux.push('/index'));
    },

    *redirectToDefault({ payload }, { call, put }) {
      yield put(routerRedux.push(`/index`));
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'redirectToDefault' });
          return;
        }
      });
    },
  },
};
