import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';

export default function Login() {
  const { setUser, user } = useContext(context);
  const [isDisabled, setIsDisabled] = useState(true);
  const history = useHistory();

  const verifyBtn = () => {
    const { email, password } = user;
    const six = 6;
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = email && regex.test(email);
    const verifyPassword = password.length >= six;

    setIsDisabled(!(verifyEmail && verifyPassword));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
    verifyBtn();
  };

  const submitLogin = () => {
    const { email } = user;
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>
      <label htmlFor="email">
        Email
        <input
          onChange={ handleChange }
          type="email"
          name="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password">
        Password
        <input
          onChange={ handleChange }
          type="password"
          name="password"
          data-testid="password-input"
        />
      </label>
      <button
        disabled={ isDisabled }
        type="button"
        data-testid="login-submit-btn"
        onClick={ submitLogin }
      >
        Entrar

      </button>
    </div>
  );
}
