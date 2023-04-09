import { createContext } from 'react';
import { TokenData } from 'util/auth';

/* ContextAPI para que os componentes Navbar e Login escutem seus estados, 
para que ao eu efetuar login o login da Navbar seja alterado e mostre logado e vice versa,
por serem componentes distintos eles não se escutam naturalmente. */

/* Criando os tipo para criar o botão de login e logout */
export type AuthContextData = {
  authenticated: boolean;
  tokenData?: TokenData;
};

export type AuthContextType = {
  authContextData: AuthContextData;
  setAuthContextData: (authContextData: AuthContextData) => void;
};

export const AuthContext = createContext<AuthContextType>({
  authContextData: {
    authenticated: false,
  },
  setAuthContextData: () => null,
});
