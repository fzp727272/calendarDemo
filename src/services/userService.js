import * as request from '../utils/request';

// 获取数据
export async function get(query) {
  return request.get(`user/get?${query}`);
}

export async function getDetail(id) {
  return request.get(`user/getDetail/${id}`);
}

export async function create() {
  return request.get('user/new');
}

// 操作
export async function update(values) {
  return request.post('user/update', values);
}

export async function login(values) {
  return request.post('user/authenticate', values);
}
