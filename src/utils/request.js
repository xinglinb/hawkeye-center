import fetch from 'dva/fetch';
import queryString from 'query-string';
import {
  message,
} from 'antd';


const baseUrl = '';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export function request(url, options) {
  return fetch(`${baseUrl}${url}`, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      const { code, msg } = data;
      if (code !== 200 && msg) {
        message.error(msg);
      }
      if (code === 405) {
        document.location.replace('/login');
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
      message.error('网络错误');
    });
}

export function post(url, params) {
  return request(url, {
    credentials: 'same-origin',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: queryString.stringify(params),
  });
}

export function get(url, params) {
  return request(`${url}?${queryString.stringify(params)}`, {
    credentials: 'same-origin',
  });
}

