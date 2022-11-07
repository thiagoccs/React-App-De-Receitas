import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import buttonLogin from '../images/Login Button.svg';
import context from '../context/context';
import './Login.css';

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
    <div className="div-login">
      <img className="logo" src="https://images2.imgbox.com/d4/2a/rdWLCdt9_o.png" alt="Logo" />
      <form>
        <h2 className="h2B">Bem Vindo!</h2>
        <label htmlFor="email">
          <input
            onChange={ handleChange }
            type="email"
            placeholder="Email"
            name="email"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          <input
            onChange={ handleChange }
            type="password"
            placeholder="Password"
            name="password"
            data-testid="password-input"
          />
        </label>
        <button
          className="img-button"
          disabled={ isDisabled }
          type="button"
          data-testid="login-submit-btn"
          onClick={ submitLogin }
        >
          <img src={ buttonLogin } alt="img-button" />
        </button>
      </form>
    </div>
  );
}
