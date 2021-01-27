import * as request from '../utils/request';

// 获取数据
export async function getDetail(id) {
  return request.get(`shipment/getDetail/${id}`);
}

export async function get(query) {
  return request.get(`shipment/get?${query}`);
}

export async function create() {
  return request.get('shipment/new');
}

// 操作
export async function update(values) {
  return request.post('shipment/update', values);
}

export async function review(values) {
  return request.post('shipment/review', values);
}

export async function unreview(values) {
  return request.post('shipment/unreview', values);
}

export async function trace(values) {
  return request.post('shipment/trace', values);
}

export async function sign(values) {
  return request.post('shipment/sign', values);
}

export async function complete(values) {
  return request.post('shipment/complete', values);
}
