import * as service from '../services/permissionService';

export default {
  namespace: 'permissions',
  state: {
    groups: [],
    permissions: [],
  },
  reducers: {
    refresh(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getGroups({ payload }, { call, put }) {
      const data = yield call(service.getGroups, payload);
      yield put({
        type: 'refresh',
        payload: { groups: data },
      });
    },
    *getPermissions({ payload }, { put, call }) {
      const data = yield call(service.getPermissions);
      yield put({
        type: 'refresh',
        payload: { permissions: data },
      });
    },
    *getGroup({ payload }, { call, put }) {
      const data = yield call(service.getGroup, payload);
      yield put({
        type: 'refresh',
        payload: { model: data },
      });
    },
    *saveGroup({ payload }, { call, put }) {
      yield call(service.saveGroup, payload);
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        switch (pathname) {
          case '/permission':
            dispatch({ type: 'getPermissions' });
            break;
          case '/permission/groups':
            dispatch({ type: 'getGroups', payload: {} });
            dispatch({ type: 'getPermissions', payload: {} });
            break;
          default:
            break;
        }
      });
    },
  },
};
