const tokenKey = 'authData';

// Salvando dados do login no LocalStorage
type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

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
