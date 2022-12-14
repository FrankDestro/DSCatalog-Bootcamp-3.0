import { Link } from 'react-router-dom';
import ButtonIcon from 'components/ButtonIcon';
import { useForm } from 'react-hook-form';
import { getAuthData, requestBackendLogin, saveAuthData } from 'util/request';
import './styles.css';
import { useState } from 'react';

type FormData = {
  username : string;
  password : string;
}

const Login = () => {

  const [hasError, setHasError] = useState(false);

  const { register, handleSubmit, formState : {errors} } = useForm<FormData>();

  const onSubmit = (formData : FormData) => {
    requestBackendLogin(formData)
    .then(response => {
      saveAuthData(response.data);
      const token = getAuthData().access_token;
      console.log('TOKEN GERADO' + token);
      setHasError(false)
      console.log('SUCESSO', response);
    })
    .catch (error => {
      setHasError(true)
      console.log('ERRO', error);
    });
  };

  return (
    <div className="base-card login-card">
      <h1>LOGIN</h1>

      {hasError && (
      <div className="alert alert-danger">
        Erro ao tentar efetuar o login. 
      </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-floating mb-4">
          <input
           {...register('username', {
            required : 'Campo obrigatório',
            pattern : {
                value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email inválido'
            }
           })}
            type="text"
            className={`form-control base-input ${errors.username ? 'is-invalid' : ''}`}
            placeholder="Email"
            name="username"
          />
          <label>Email</label>
          <div className="invalid-feedback d-block">{errors.username?.message}</div>
        </div>

        <div className="form-floating mb-2">
          <input
            {...register('password', {
              required : 'Campo obrigatório'
             })}
            type="password"
            className={`form-control base-input ${errors.password ? 'is-invalid' : ''}`}
            placeholder="Password"
            name="password"
          />
          <label>Password</label>
          <div  className="invalid-feedback d-block">{errors.password?.message}</div>
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
