import * as service from '../services/userService';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'user',
  state: {
    data: {},
    fields: [],
  },
  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },
    reduceData(state, { payload }) {
      return { ...state, data: { ...state.data, ...payload } };
    },
  },

  effects: {
    *get({ payload }, { put, call }) {
      const data = yield call(service.getDetail, payload.id);
      yield put({
        type: 'reduce',
        payload: data,
      });
    },

    *create({ payload }, { put, call }) {
      const data = yield call(service.create);
      yield put({
        type: 'reduce',
        payload: data,
      });
    },

    *update({ payload }, { call, put }) {
      const isCreate = payload.id === 0;

      const data = yield call(service.update, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'users/reduce',
        payload: { currentQuery: null },
      });

      if (isCreate) {
        yield put(routerRedux.push(`/user/${data.id}`));
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        var pathToRegexp = require('path-to-regexp');
        const match = pathToRegexp('/user/:id').exec(pathname);
        if (match) {
          if (match[1] === 'create') {
            dispatch({ type: 'create' });
          } else {
            dispatch({ type: 'get', payload: { id: match[1] } });
          }
        }
      });
    },
  },
};
