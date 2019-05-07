import fetch from 'dva/fetch';
import queryString from 'query-string';
import {
  message,
} from 'antd';
import cookie from './cookie';

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
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      if (data.status) {
        message.error(data.message);
      }
      if (!data.success) {
        message.error(data.msg.text);
        if (!data.msg.isLogin) {
          cookie.clearCookie();
          document.location.replace('#/login');
        }
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

export function CORSrequest(url, options) {
  return fetch(url, options)
    .then(parseJSON)
    .then((data) => {
      if (!data.success) {
        console.log(data.msg.text);
      }
      return data;
    })
    .catch((err) => {
      console.log(err);
      message.error('网络错误');
    });
}

export function JSONpost(url, params) {
  return CORSrequest(url, {
    method: 'post',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
}

export function CORSget(url, params) {
  return CORSrequest(url, {
    // credentials: 'include',
    method: 'GET',
    mode: 'cors',
    headers: {
      // "Cookie": 'token=eyJpZCI6IjIiLCJ1c2VyIjoiYWRtaW4ifQ.yYYidvSXR9l893_R-49peY0Lg9vJEz27aue-zX_pYCc',
      // "token":'eyJpZCI6IjIiLCJ1c2VyIjoiYWRtaW4ifQ.yYYidvSXR9l893_R-49peY0Lg9vJEz27aue-zX_pYCc'
    },
  });
}

export function download(url, params) {
  const oReq = new XMLHttpRequest();
  oReq.open('GET', `${url}?${queryString.stringify(params)}`, true);
  oReq.responseType = 'blob';
  oReq.onload = function (oEvent) {
    const content = oReq.response;

    const elink = document.createElement('a');
    elink.download = 'info.xlsx';
    elink.style.display = 'none';

    const blob = new Blob([content]);
    elink.href = URL.createObjectURL(blob);

    document.body.appendChild(elink);
    elink.click();

    document.body.removeChild(elink);
  };
  oReq.send();
}
