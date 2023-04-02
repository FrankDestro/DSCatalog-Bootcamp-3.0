import { Redirect, Route } from 'react-router-dom';
import { isAutenticaded } from 'util/request';

type Props = {
  children: React.ReactNode;
  path: string;
};

const PrivateRoute = ({ children, path }: Props) => {

  return (
    <Route
      path={path}
      render={({location}) =>
        isAutenticaded() ?  children : 
        <Redirect 
        to={{
          pathname : "/admin/auth/login",
          state : {from:location}
        }} />
      }
    />
  );
};

export default PrivateRoute;
