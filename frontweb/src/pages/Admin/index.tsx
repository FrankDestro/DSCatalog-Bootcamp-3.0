import PrivateRoute from 'components/PrivateRoute';
import { Switch } from 'react-router-dom';
import Navbar from './Navbar';
import Users from './User';

import './styles.css';

/* As rotas admin elas irão utilizar o privateRoute para barrar o acesso caso usúario não esteja logado.
Para rotas sem restrição você utiliza o Route normal, para rotas protegidas você utiliza o PrivateRoute. */

const Admin = () => {
  return (
    <div className="admin-container">
      <Navbar />
      <div className="admin-content">
        <Switch>
          <PrivateRoute path="/admin/products">
            <h1> Product CRUD </h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/categories">
            <h1> Category CRUD </h1>
          </PrivateRoute>
          <PrivateRoute path="/admin/users">
            <Users />
          </PrivateRoute>
        </Switch>
      </div>
    </div>
  );
};

export default Admin;
