import * as request from '../utils/request';
export async function create() {
  return request.get('carrier/new');
}

export async function getDetail(id) {
  return request.get(`carrier/getDetail/${id}`);
}

export async function get(query) {
  return request.get(`carrier/get?${query}`);
}

export async function getListByCode(code) {
  return request.get(`carrier/getListByCode`, { code });
}

export async function update(data) {
  return request.post('carrier/update', data);
}
