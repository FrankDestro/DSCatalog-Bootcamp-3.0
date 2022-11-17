import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';

import './styles.css';

type FormData = {
  username : String;
  password : String;
}

const Login = () => {

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (formData : FormData) => {
    console.log(formData);
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mb-4">
          <input
           {...register('username')}
            type="text"
            className="form-control base-input"
            placeholder="Email"
            name="username"
          />
          <label>Email</label>
        </div>

        <div className="form-floating mb-2">
          <input
            {...register('password')}
            type="password"
            className="form-control base-input "
            placeholder="Password"
            name="password"
          />
          <label>Password</label>
        </div>

        <Link to="/admin/auth/recover" className="login-link-recover"> Esqueci a senha </Link>
        <div className="login-submit">
          <ButtonIcon text="Fazer login" />
        </div>

        <div className="signup-container">
          <span className="not-registered">Não tem Cadastro?</span>
          <Link to="/admin/auth/register" className="login-link-register">CADASTRAR </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
