export default {
  namespace: 'chart',
  state: {
    chart1: {
      data: [
        { genre: 'Sports', sold: 275, income: 2300 },
        { genre: 'Strategy', sold: 115, income: 667 },
        { genre: 'Action', sold: 120, income: 982 },
        { genre: 'Shooter', sold: 350, income: 5271 },
        { genre: 'Other', sold: 150, income: 3710 },
      ],
      cols: { sold: { alias: '销售量' }, genre: { alias: '游戏种类' } },
    },
  },
  reducers: {
    fetchData(state, { payload }) {
      // console.log('shipment:reducer:fetchSuccess', payload);
      // const { data } = payload;
      // console.log("1231",data)
      return state;
    },
  },

  effects: {
    *getChartData({ payload }, { put, call }) {
      yield put({
        type: 'fetchData',
        // payload: {
        //   data: data,
        // },
      });
    },
  },
  subscriptions: {},
};
