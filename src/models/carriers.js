import * as service from '../services/carrierService';
import { toTableQuery } from '../utils/util';

export default {
  namespace: 'carriers',
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
      const { currentQuery, currentFilters, currentSorter } = yield select(state => state.carriers);

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
        if (pathname === '/carrier') {
          dispatch({ type: 'get' });
        }
      });
    },
  },
};
