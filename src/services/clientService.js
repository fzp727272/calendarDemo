import * as request from '../utils/request';
export async function create() {
  return request.get('client/new');
}

export async function getDetail(id) {
  return request.get(`client/getDetail/${id}`);
}

export async function get(query) {
  return request.get(`client/get?${query}`);
}

export async function getList(parameters) {
  return request.get('client/getList', parameters);
}

export async function getListByCode(code) {
  return request.get(`client/getListByCode`, { code });
}

export async function update(data) {
  return request.post('client/update', data);
}
