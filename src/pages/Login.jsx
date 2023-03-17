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
    <div className="bg-violet-900 h-screen flex flex-col-reverse">
      <img
        className="absolute mt-2 place-self-center inset-y-14 w-64"
        src={ fullRecipesLogo }
        alt="tomate"
      />
      <img
        className="absolute mt-2 inset-y-1/4 w-full"
        src={ tomatoes }
        alt="tomate"
      />
      <form className="bg-white h-1/2 w-screen flex flex-col justify-center items-center">
        <h1 className="text-violet-900 text-3xl">LOGIN</h1>
        <label htmlFor="email">
          <input
            className="p-2 px-9 mt-8 mb-3 placeholder-violet-900
            border-violet-900 border rounded"
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
            className="p-2 px-9 mb-3 placeholder-violet-900
            border-violet-900 border rounded"
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
          className="bg-yellow-400 disabled:opacity-50 text-white p-2
          px-28 font-bold cursor-pointer rounded"
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
