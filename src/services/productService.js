import request from '../utils/request';

export async function getOne(id) {
  return request(`product/getDetail/${id}`);
}

export async function get(query) {
  return request(`product/get?${query}`);
}

export async function getListByCode(code) {
  return request(`product/getListByCode?value=${code}`);
}

export async function create() {
  return request('product/new');
}

export async function update(values) {
  return request('product/update', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
