import * as service from '../services/orderService';
import { toTableQuery } from '../utils/util';

export default {
  namespace: 'orders',
  state: {
    currentQuery: '',
    currentPagination: {},
    currentFilters: [],
    currentSorter: {},
  },
  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *get({ pagination, filters, sorter }, { call, put, select }) {
      const { currentQuery, currentFilters, currentSorter } = yield select(state => state.orders);

      const query = toTableQuery(pagination, filters || currentFilters, sorter || currentSorter);

      if (currentQuery !== query) {
        const data = yield call(service.get, query);
        yield put({
          type: 'reduce',
          payload: {
            ...data,
            currentQuery: query,
            currentFilters: filters,
            currentPagination: pagination,
            currentSorter: sorter,
          },
        });
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/order') {
          console.log('dispatch order');
          dispatch({ type: 'get' });
        }
      });
    },
  },
};
