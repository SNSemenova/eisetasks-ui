import fetch from 'isomorphic-fetch';
import { Promise } from 'es6-promise';

let responseCodes = {
  404: '/404',
  500: '/500',
  502: '/502',
};

function checkStatus(response) {
  if (undefined !== responseCodes[response.status]) {
    window.location.href = responseCodes[response.status];
  }
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  }

  return Promise.reject(new Error(response.statusText));
}

function getResponseJson(response) {
  return response.json();
}

export function get(url) {
  return fetch(url, {
    method: 'GET',
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })
  })
    .then((response) => checkStatus(response))
    .then((json) => getResponseJson(json))
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
}

export function post(url, requestData) {
  return fetch(url, {
    credentials: "same-origin",
    method: 'POST',
    headers: new Headers({
       "Content-Type": "application/json"
    }),
        body: requestData
  })
   .then((response) => checkStatus(response))
    .then((json) => getResponseJson(json))
    .then((data) => {
      //console.log('POST. Request succeeded with JSON', data);
      return data;
    })
  .catch((error) => {
    return error;
  });
}

export function put(url, requestData) {
  return fetch(url, {
    method: 'PUT',
    headers: new Headers({
      "Accept": "application/json",
       "Content-Type": "application/json;charset=UTF-8"
    }),
        body: requestData
  })
   .then((response) => checkStatus(response))
    .then((json) => getResponseJson(json))
    .then((data) => {
      return data;
    })
    .catch((error) => {
      //console.log('Request failed', error);
      return error;
    });   
}

export function del(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: new Headers({
      "Accept": "application/json",
       "Content-Type": "application/json;charset=UTF-8"
    })
  })
   .then((response) => checkStatus(response))
    .then((data) => {
      return data;
    })
    .catch((error) => {
      //console.log('Request failed', error);
      return error;
    });   
}