import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import tomatoes from '../images/tomate.svg';
import fullRecipesLogo from '../images/fullRecipesLogo.svg';

function Login() {
  const history = useHistory();

  const [userEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValited] = useState(true);

  useEffect(() => {
    const minLength = 6;
    const passwordValidat = password.length > minLength;
    const emailValidat = userEmail.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

    if (passwordValidat && emailValidat) {
      setValited(false);
    } else {
      setValited(true);
    }
  }, [userEmail, password]);

  const handleClick = () => {
    const obj = { email: userEmail };
    localStorage.setItem('user', JSON.stringify(obj));
    history.push('/meals');
  };

  return (
    <div className="container-login">
      <img
        className="img1-login"
        src={ fullRecipesLogo }
        alt="tomate"
      />
      <img
        className="img2-login"
        src={ tomatoes }
        alt="tomate"
      />
      <form className="form-login">
        <h1 className="title-form-login">LOGIN</h1>
        <label htmlFor="email">
          <input
            className="input-login"
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            placeholder="Email"
            value={ userEmail }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
        <label>
          <input
            className="input-login"
            type="password"
            name="password"
            id="password"
            data-testid="password-input"
            placeholder="Password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
        <button
          className="button-login"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ validated }
          onClick={ () => handleClick() }
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

export default Login;
