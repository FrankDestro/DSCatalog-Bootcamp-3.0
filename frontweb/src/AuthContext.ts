import { createContext } from 'react';
import { TokenData } from 'util/request';

/* ContextAPI para que os componentes Navbar e Login escutem seus estados, 
para que ao eu efetuar login o login da Navbar seja alterado e mostre logado e vice versa,
por serem componentes distintos eles não se escutam naturalmente. */

/* Criando os tipo para criar o botão de login e logout */
export type AuthContextData = {
  autenticaded: boolean | undefined;
  tokenData?: TokenData;
};

export type AuthContextType = {
  authContextData: AuthContextData;
  setAuthContextData: (authContextData: AuthContextData) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authContextData: {
    autenticaded: false,
  },
  setAuthContextData: () => null,
});
