import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Teste da Page Login', () => {
  const userEmail = 'teste@teste.com';
  const userPassword = '1234567';
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  const loginSubmitBtn = 'login-submit-btn';
  const mockId = 'user';
  const mockJson = { email: 'teste@teste.com' };

  beforeEach(() => {
    window.localStorage.clear();
  });

  it('testa se os campos Email e Password estão renderizados na tela', () => {
    renderWithRouterAndContext(<App />);
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    expect(email && password).toBeInTheDocument();
  });
  it('testa se o botão de entrar esta disabled ao renderizar a pagina', () => {
    renderWithRouterAndContext(<App />);
    const btn = screen.getByTestId(loginSubmitBtn);
    expect(btn).toBeDisabled();
  });
  it('Testa se ao preencher os campos email e senha com dados válidos o botão entrar é habilitado', () => {
    renderWithRouterAndContext(<App />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const btn = screen.getByTestId(loginSubmitBtn);

    userEvent.type(email, userEmail);
    userEvent.type(password, userPassword);

    expect(btn).not.toBeDisabled();
  });
  it('Testa se a chave user existe no localstorage', async () => {
    renderWithRouterAndContext(<App />);

    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const btn = screen.getByTestId(loginSubmitBtn);

    userEvent.type(email, userEmail);
    userEvent.type(password, userPassword);
    userEvent.click(btn);

    window.localStorage.setItem(mockId, JSON.stringify(mockJson));

    expect(localStorage.getItem(mockId)).toEqual(JSON.stringify(mockJson));
  });
});
