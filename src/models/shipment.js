import * as service from '../services/shipmentService';
import * as clientService from '../services/clientService';
import * as carrierService from '../services/carrierService';
import * as mapService from '../services/amapService';
import { routerRedux } from 'dva/router';
import * as helper from '../utils/helper';
import { upsert } from '../utils/util';

export default {
  namespace: 'shipment',
  state: {
    data: {},
    fields: [],
    editProduct: {},
    editProductVisible: false,
    editPackage: {},
    editPackageVisible: false,
    editExpense: {},
    editExpenseVisible: false,
    // for select option
    clientList: [],
    carrierList: [],
    addressList: [],
  },
  reducers: {
    reduce(state, { payload }) {
      return { ...state, ...payload };
    },
    reduceData(state, { payload }) {
      return { ...state, data: { ...state.data, ...payload } };
    },

    updateProduct(state, { payload }) {
      let list = upsert(state.data.items, { ...state.editProduct, ...payload });

      return {
        ...state,
        data: { ...state.data, items: list },
        editProductVisible: false,
      };
    },
    updatePackage(state, { payload }) {
      let list = upsert(state.data.packages, { ...state.editPackage, ...payload });
      return {
        ...state,
        data: { ...state.data, packages: list },
        editPackageVisible: false,
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

    addTrackingAddress(state, { payload }) {
      return {
        ...state,
        data: {
          ...state.data,
          trackingAddresses: [...(state.data.trackingAddresses || []), payload],
        },
      };
    },

    updateAttachments(state, { payload }) {
      console.log('shipment.updateAttachments', payload);
      return {
        ...state,
        data: {
          ...state.data,
          attachments: payload,
        },
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

      if (data.data.startAddress && data.data.startAddress.length > 0) {
        const startGeoData = yield call(
          mapService.GetGeo,
          helper.addressCityToString(data.data.startAddress),
        );

        const startGeo = startGeoData.geocodes[0].location.split(',');
        console.log('startGeo', startGeo);

        yield put({
          type: 'reduce',
          payload: {
            startGeo: { longitude: parseFloat(startGeo[0]), latitude: parseFloat(startGeo[1]) },
          },
        });
      }

      if (data.data.endAddress && data.data.endAddress.length > 0) {
        const endGeoData = yield call(
          mapService.GetGeo,
          helper.addressCityToString(data.data.endAddress),
        );

        const endGeo = endGeoData.geocodes[0].location.split(',');
        console.log('endGeo', endGeo);
        yield put({
          type: 'reduce',
          payload: {
            endGeo: { longitude: parseFloat(endGeo[0]), latitude: parseFloat(endGeo[1]) },
          },
        });
      }
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
        type: 'shipments/reduce',
        payload: { currentQuery: null },
      });

      if (isCreate) {
        yield put(routerRedux.push(`/shipment/${data.id}`));
      }
    },

    *review({ payload }, { call, put }) {
      const data = yield call(service.review, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'shipments/reduce',
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
        type: 'shipments/reduce',
        payload: { currentQuery: null },
      });
    },

    *trace({ payload }, { call, put }) {
      const data = yield call(service.trace, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'shipments/reduce',
        payload: { currentQuery: null },
      });
    },

    *sign({ payload }, { call, put }) {
      const data = yield call(service.sign, payload);

      yield put({
        type: 'reduceData',
        payload: data,
      });

      yield put({
        type: 'shipments/reduce',
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
        type: 'shipments/reduce',
        payload: { currentQuery: null },
      });
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
        const match = pathToRegexp('/shipment/:id').exec(pathname);
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
