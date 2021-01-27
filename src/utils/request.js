import fetch from 'dva/fetch';
import querystring from 'querystring';
import { notification } from 'antd';

export const serverUrl = process.env.apiUrl;

export const uploadUrl = serverUrl + '/shipment/upload';

export function getAttachmentUrl(name) {
  return serverUrl + '/shipment/getfile?name=' + name;
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const contentType = response.headers.get('content-type');

  let message = '';
  if (response.state === 401) {
    message = '用户未登录';
  }
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const json = await response.json();
    message = json.message;
  }

  const error = new ErrorEvent(response.status, {
    error: new Error(response),
    message: message,
  });

  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options = {}, includeCredential = true) {
  if (options && options.method === 'POST') {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  if (!url.startsWith('http')) {
    url = `${serverUrl}/${url}`;
  }

  console.log('request:', url, options);
  const response = await fetch(url, {
    ...options,
    credentials: includeCredential ? 'include' : 'same-origin',
  });
  await checkStatus(response);

  let data = '';
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    data = await response.json();
  }

  console.log('response:', data);

  if (options && options.method === 'POST') {
    notification.success({
      message: '保存成功',
    });
  }

  return data;
}

export async function post(url, data) {
  return request(url, {
    method: 'POST',
    body: data ? JSON.stringify(data) : null,
  });
}

export async function get(url, data) {
  return request(url + '?' + querystring.stringify(data));
}
