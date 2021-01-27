import request from '../utils/request';

export async function getChart(params) {
  return request('api/fake_chart_data');
}
