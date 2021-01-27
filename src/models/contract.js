import * as service from '../services/contractService';
import * as clientService from '../services/clientService';
import * as carrierService from '../services/carrierService';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'contract',
  state: {
    data: {},
    fields: [],
    // for select option
    clientList: [],
    carrierList: [],

    // used in form to control whether client input is visible
    contractType: '',
  },

  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },
    reduceData(state, { payload }) {
      return { ...state, data: { ...state.data, ...payload } };
    },
    addAddress(state, { payload }) {
      return {
        ...state,
        data: { ...state.data, addresses: [...(state.data.addresses || []), payload] },
      };
    },
  },
  effects: {
    *get({ payload }, { put, call }) {
      const data = yield call(service.getOne, payload.id);
      yield put({
        type: 'reduce',
        payload: { ...data, contractType: data.data.contractType },
      });
    },

    *create({ payload }, { put, call }) {
      const data = yield call(service.create);
      yield put({
        type: 'reduce',
        payload: { ...data, contractType: data.data.contractType },
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
        type: 'contracts/reduce',
        payload: { currentQuery: null },
      });

      if (isCreate) {
        yield put(routerRedux.push(`/contract/${data.id}`));
      }
    },

    *createRate({ contractId }, { call, put }) {
      yield put(routerRedux.push('/contractRate/create?contractId=' + contractId));
    },

    *viewRate({ id }, { call, put }) {
      yield put(routerRedux.push('/contractRate/' + id));
    },

    *searchClient({ payload }, { call, put }) {
      const data = yield call(clientService.getListByCode, payload.value);
      yield put({
        type: 'reduce',
        payload: { clientList: data },
      });
    },

    *searchCarrier({ payload }, { call, put }) {
      const data = yield call(carrierService.getListByCode, payload.value);
      yield put({
        type: 'reduce',
        payload: { carrierList: data },
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        var pathToRegexp = require('path-to-regexp');
        const match = pathToRegexp('/contract/:id').exec(pathname);
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
