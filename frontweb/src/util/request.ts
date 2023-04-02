import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import history from './history';
import jwtDecode from 'jwt-decode';

// URL DE COMUNICAÇÃO COM API BACKEND
export const BASE_URL =
  process.env.REACT_APP_BACK_URL ?? 'http://localhost:8080';

// REQUISIÇÃO DO BACKEND PARA ROTAS AUTORIZADAS.
export const requestBackend = (config: AxiosRequestConfig) => {
  const headers = config.withCredentials
    ? {
        ...config.headers,
        Authorization: 'Bearer' + getAuthData().access_token,
      }
    : { ...config.headers };

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// REQUISIÇÃO DE LOGIN BACKEND
type LoginData = {
  username: string;
  password: string;
};

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ?? 'dscatalog';
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

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

// Salvando dados do login no LocalStorage

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

const tokenKey = 'authData';

// Salvar no localstorage
export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

// Pegar os dados salvos no localstorage
export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}';
  return JSON.parse(str) as LoginResponse;
};

// Deletar os dados no localstorage
export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
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
    if (error.response.status === 401 || 403) {
      history.push('/admin/auth/login');
    }
    console.log('INTERCEPTOR RESPOSTA COM ERRO');
    return Promise.reject(error);
  }
);

// Função para decodificar o token.
type Role = 'ROLE_ADMIN' | 'ROLE_OPERATOR'; // Tipo um Enum

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
  const logiResponse = getAuthData();
  try {
    return jwtDecode(logiResponse.access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

// Função para testar se o usuário esta autenticado.
export const isAutenticaded = (): boolean | undefined => {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

/* função para verificar se um dos usuario possui algum dos roles 
que for passado de argumento para a função */
export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  // forma 1
  if (tokenData !== undefined) {
    return roles.some((role) => tokenData.authorities.includes(role));
  }

  return false;

  //  // forma 2
  //   if (tokenData !== undefined) {
  //     for (var i = 0; i < roles.length; i++) {
  //       if (tokenData.authorities.includes(roles[i])) {
  //         return true;
  //       }
  //     }
  //   }

  //   return false;
};
