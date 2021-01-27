import request from '../utils/request';
import querystring from 'querystring';

export async function getOne(id) {
  return request(`contractRate/getDetail/${id}`);
}

export async function get(query) {
  return request(`contractRate/get?${query}`);
}

export async function create(query) {
  console.log('create', query);
  return request('contractRate/new' + '?' + querystring.stringify(query));
}

export async function createItem() {
  return request('contractRate/newItem');
}

export async function update(values) {
  return request('contractRate/update', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
