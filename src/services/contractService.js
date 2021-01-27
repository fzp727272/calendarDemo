import * as request from '../utils/request';

export async function getOne(id) {
  return request.get(`contract/getDetail/${id}`);
}

export async function get(query) {
  return request.get(`contract/get?${query}`);
}

export async function create() {
  return request.get('contract/new');
}

export async function getList() {
  return request.get('contract/getList');
}

export async function update(data) {
  return request.post('contract/update', data);
}

export async function getListByCode(code) {
  return request.get(`contract/getListByCode`, { code });
}
