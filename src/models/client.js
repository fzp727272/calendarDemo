import * as service from '../services/clientService';
import { routerRedux } from 'dva/router';
import { upsert } from '../utils/util';

export default {
  namespace: 'client',
  state: {
    fields: [],
    data: {},

    editAddress: {},
    editAddressVisible: false,
  },
  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },

    reduceData(state, { payload }) {
      return { ...state, data: { ...state.data, ...payload } };
    },

    // address
    updateAddress(state, { payload }) {
      let list = upsert(state.data.addresses, { ...state.editAddress, ...payload });

      return {
        ...state,
        data: { ...state.data, addresses: list },
        editAddressVisible: false,
      };
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

    *update({ data }, { call, put }) {
      const isCreate = data.id === 0;

      const newData = yield call(service.update, data);

      yield put({
        type: 'reduceData',
        payload: newData,
      });

      yield put({
        type: 'clients/reduce',
        payload: { currentQuery: null },
      });

      if (isCreate) {
        yield put(routerRedux.push(`/client/${newData.id}`));
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        var pathToRegexp = require('path-to-regexp');
        const match = pathToRegexp('/client/:id').exec(pathname);
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
