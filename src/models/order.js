import * as service from '../services/orderService';
import * as clientService from '../services/clientService';
import { routerRedux } from 'dva/router';
import { upsert } from '../utils/util';

export default {
  namespace: 'order',
  state: {
    data: {},
    fields: [],
    editPackage: {},
    editPackageVisible: false,
    editProduct: {},
    editProductVisible: false,
    editExpense: {},
    editExpenseVisible: false,
    editVehicle: {},
    editVehicleVisible: false,
    // for select option
    clientList: [],
    addressList: [],
  },
  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },
    reduceData(state, { payload }) {
      return { ...state, data: { ...state.data, ...payload } };
    },
    updatePackage(state, { payload }) {
      let list = upsert(state.data.packages, { ...state.editPackage, ...payload });

      return {
        ...state,
        data: { ...state.data, packages: list },
        editPackageVisible: false,
      };
    },
    updateProduct(state, { payload }) {
      let list = upsert(state.data.items, { ...state.editProduct, ...payload });

      return {
        ...state,
        data: { ...state.data, items: list },
        editProductVisible: false,
      };
    },
    updateExpense(state, { payload }) {
      let list = upsert(state.data.expenses, { ...state.editExpense, ...payload });

      return {
        ...state,
        data: { ...state.data, expenses: list },
        editExpenseVisible: false,
      };
    },
    updateVehicle(state, { payload }) {
      let list = upsert(state.data.vehicles, { ...state.editVehicle, ...payload });

      return {
        ...state,
        data: { ...state.data, expenses: list },
        editVehicleVisible: false,
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

    *update({ payload }, { call, put }) {
      const isCreate = payload.id === 0;

      const data = yield call(service.update, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'orders/reduce',
        payload: { currentQuery: null },
      });

      if (isCreate) {
        yield put(routerRedux.push(`/order/${data.id}`));
      }
    },

    *review({ payload }, { call, put }) {
      const data = yield call(service.review, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'orders/reduce',
        payload: { currentQuery: null },
      });
    },

    *unreview({ payload }, { call, put }) {
      const data = yield call(service.unreview, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'orders/reduce',
        payload: { currentQuery: null },
      });
    },

    *complete({ payload }, { call, put }) {
      const data = yield call(service.complete, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'orders/reduce',
        payload: { currentQuery: null },
      });
    },

    *generateShipment({ payload }, { call, put }) {
      yield call(service.generateShipment, payload);
      yield put({
        type: 'shipments/reduce',
        payload: { currentQuery: null },
      });
      yield put(routerRedux.push(`/shipment`));
    },

    *searchClient({ payload }, { call, put }) {
      const data = yield call(clientService.getListByCode, payload.value);
      yield put({
        type: 'reduce',
        payload: { clientList: data },
      });
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return history.listen(({ pathname }) => {
        var pathToRegexp = require('path-to-regexp');
        const match = pathToRegexp('/order/:id').exec(pathname);

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
