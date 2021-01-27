import * as request from '../utils/request';

// 获取数据
export async function get(query) {
  return request.get(`order/get?${query}`);
}

export async function getDetail(id) {
  return request.get(`order/getDetail/${id}`);
}

export async function create() {
  return request.get('order/new');
}

// 操作
export async function update(values) {
  return request.post('order/update', values);
}

export async function review(values) {
  return request.post('order/review', values);
}

export async function unreview(values) {
  return request.post('order/unreview', values);
}

export async function complete(values) {
  return request.post('order/complete', values);
}

export async function generateShipment(values) {
  return request.post('order/generateShipment', values);
}
