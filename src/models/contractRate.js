import * as service from '../services/contractRateService';
import * as contractService from '../services/contractService';
import { routerRedux } from 'dva/router';
import { upsert } from '../utils/util';

export default {
  namespace: 'contractRate',
  state: {
    fields: [],
    data: {},
    editItem: {},
    editItemVisible: false,
    // for select option
    contractList: [],
  },

  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },

    reduceData(state, { payload }) {
      return { ...state, data: { ...state.data, ...payload } };
    },

    updateItem(state, { payload }) {
      let list = upsert(state.data.items, { ...state.editItem, ...payload });

      return {
        ...state,
        data: { ...state.data, items: list },
        editItemVisible: false,
      };
    },
  },

  effects: {
    *get({ payload }, { put, call }) {
      const data = yield call(service.getOne, payload.id);
      yield put({
        type: 'reduce',
        payload: data,
      });
    },

    *create({ query }, { put, call }) {
      const data = yield call(service.create, query);
      yield put({
        type: 'reduce',
        payload: data,
      });
    },

    *update({ payload }, { call, put }) {
      const isCreate = payload.id === 0;

      const data = yield call(service.update, payload);

      yield put({
        type: 'contractRates/reduce',
        payload: { currentQuery: null },
      });

      if (isCreate) {
        yield put(routerRedux.push(`/contractRate/${data.id}`));
      }
    },

    *searchContract({ payload }, { call, put }) {
      const data = yield call(contractService.getListByCode, payload.value);
      yield put({
        type: 'reduce',
        payload: { contractList: data },
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname, query }) => {
        var pathToRegexp = require('path-to-regexp');
        const match = pathToRegexp('/contractRate/:id').exec(pathname);
        if (match) {
          if (match[1] === 'create') {
            dispatch({ type: 'create', query: query });
          } else {
            dispatch({ type: 'get', payload: { id: match[1] } });
          }
        }
      });
    },
  },
};
