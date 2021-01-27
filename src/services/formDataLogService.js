import { get } from '../utils/request';
export async function getCompareData(id) {
  return get(`formDataLog/getCompareData/${id}`);
}

export async function getList(parameters) {
  return get('formDataLog/getList', parameters);
}
