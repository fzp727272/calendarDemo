import request from '../utils/request';

export const key = 'edc46016795b281f89b4b533ebe3e4f3';
export const apiKey = 'd8f7f2029f7c1a15a2a3bbc51d1b46c0';

const url = 'https://restapi.amap.com/v3/geocode/geo';

export async function GetGeo(address) {
  return request(`${url}?key=${apiKey}&address=${address}`, {}, false);
}
