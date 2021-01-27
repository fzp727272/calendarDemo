import * as service from '../services/userService';
import { toTableQuery } from '../utils/util';

export default {
  namespace: 'users',
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
      console.log('users.get');
      const { currentQuery, currentFilters, currentSorter } = yield select(state => state.users);

      const query = toTableQuery(pagination, filters || currentFilters, sorter || currentSorter);

      console.log(currentQuery, query);
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
        if (pathname === '/user') {
          console.log('dispatch user');
          dispatch({ type: 'get' });
        }
      });
    },
  },
};
