import request from '../utils/request';
export async function getGroup(id) {
  return request(`permission/getGroup?id=${id}`);
}
export async function getGroups() {
  return request(`permission/getGroups`);
}
export async function getPermissions() {
  return request(`permission/getPermissions`);
}
export async function saveGroup(values) {
  return request('permission/saveGroup', {
    method: 'POST',
    body: JSON.stringify(values),
  });
}
