import * as service from '../services/productService';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'product',
  state: {},
  reducers: {
    refresh(state, { payload }) {
      return { ...state, ...payload };
    },
    reduceData(state, { payload }) {
      return { ...state, data: { ...state.data, ...payload } };
    },
  },
  effects: {
    *get({ payload }, { put, call }) {
      const data = yield call(service.getOne, payload.id);
      yield put({
        type: 'refresh',
        payload: data,
      });
    },

    *create({ payload }, { put, call }) {
      const data = yield call(service.create);
      yield put({
        type: 'refresh',
        payload: data,
      });
    },

    *update({ payload }, { call, put }) {
      const isCreate = payload.data.id === 0;

      const data = yield call(service.update, payload.data);

      yield put({
        type: 'products/reduce',
        payload: { currentQuery: null },
      });

      if (isCreate) {
        yield put(routerRedux.push(`/product/${data.id}`));
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        var pathToRegexp = require('path-to-regexp');
        const match = pathToRegexp('/product/:id').exec(pathname);
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
