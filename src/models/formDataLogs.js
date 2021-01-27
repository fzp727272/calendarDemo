import * as service from '../services/formDataLogService';

export default {
  namespace: 'formDataLogs',
  state: {
    current:null,
    prev:null,
    parameter: null,
    page: { pageIndex: 1, pageSize: 50 },
    fields: [],
    list: [],
  },
  reducers: {
    refresh(state, { payload }) {
      return payload;
    },
  },
  effects: {
    *getList({ payload }, { call, put }) {
      const data = yield call(service.getList, payload);
      yield put({
        type: 'refresh',
        payload: data,
      });
    },
    *getCompareData({ payload }, { call, put }) {
      const data = yield call(service.getCompareData, payload.id);
      yield put({
        type: 'refresh',
        payload: data,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/formDataLog') {
          dispatch({ type: 'getList' });
        } else {
          var pathToRegexp = require('path-to-regexp');
          const match = pathToRegexp('/formDataLog/:id').exec(pathname);
          if (match) {
            dispatch({ type: 'getCompareData', payload: { id: match[1] } });
          }
        }
      });
    },
  },
};
