import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import { getAuthData } from './storage';

// URL DE COMUNICAÇÃO COM API BACKEND
export const BASE_URL =  process.env.REACT_APP_BACKEND_URL ?? 'http://localhost:8080';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';


// REQUISIÇÃO DE LOGIN BACKEND
type LoginData = {
  username: string;
  password: string;
};

export const requestBackendLogin = (loginData: LoginData) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Authorization: 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET),
  };

  const data = qs.stringify({
    ...loginData,
    grant_type: 'password',
  });

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: '/oauth/token',
    data,
    headers,
  });
};


// REQUISIÇÃO DO BACKEND PARA ROTAS AUTORIZADAS.
export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer ' + getAuthData().access_token,
      }
    : config.headers;

  return axios({ ...config, baseURL: BASE_URL, headers });
};


// INTERCEPTIONS - You can intercept requests or responses before they are handled by then or catch.
/* Ex. usuario Alex tem perfil de operator e não pode acessar a aba usuario
dessa forma ocorre o interception e barra ele dando um erro 403, ou erro 
401 caso não tenha usuario autenticado e ele tente acessar a rota protegia,
porém esta configurado em nivel de backend, pois a rota usuario efetua uma
requisição é aonde o interceptions entra, para bloquear rotas não autorizadas 
em nivel de front end é necesario utilizar Private Routes. */

// REQUESTS
// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log('INTERCEPTOR ANTES DA REQUISIÇÃO');
    return config;
  },
  function (error) {
    console.log('INTERCEPTOR ERRO DA REQUISIÇÃO');
    // Do something with request error
    return Promise.reject(error);
  }
);

// RESPONSES
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log('INTERCEPTOR RESPOSTA COM SUCESSO');
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response.status === 401) {
      history.push('/admin/auth');
    }
    console.log('INTERCEPTOR RESPOSTA COM ERRO');
    return Promise.reject(error);
  }
);
