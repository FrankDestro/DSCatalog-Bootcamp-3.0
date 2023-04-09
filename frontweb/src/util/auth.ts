import jwtDecode from 'jwt-decode';
import { getAuthData } from './storage';

// Função para decodificar o token.
export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

export type TokenData = {
  exp: number;
  user_name: string;
  authorities: Role[];
};

export const getTokenData = (): TokenData | undefined => {
  try {
    return jwtDecode(getAuthData().access_token) as TokenData;
  } catch (error) {
    return undefined;
  }
};

// Função para testar se o usuário esta autenticado.
export const isAuthenticated = (): boolean => {
  let tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false;
};

/* função para verificar se um dos usuario possui algum dos roles 
que for passado de argumento para a função */
export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }

  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    //Forma 1
    return roles.some((role) => tokenData.authorities.includes(role));
  }

  return false;

  // Forma 2 
  //   for (var i = 0; i < roles.length; i++) {
  //     if (tokenData.authorities.includes(roles[i])) {
  //       return true;
  //     }
  //   }
  //   //return roles.some(role => tokenData.authorities.includes(role));
  // }

  // return false;
};
