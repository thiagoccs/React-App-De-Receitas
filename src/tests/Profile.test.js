import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Profile from '../Pages/Profile';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Teste do componente PROFILE', () => {
  const mockId = 'user';
  const mockJson = { email: 'teste@teste.com' };

  beforeEach(() => {
    window.localStorage.setItem(mockId, JSON.stringify(mockJson));
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  test('Testa renderização dos itens no Profile, e se os botões e links levam a outras páginas', async () => {
    renderWithRouterAndContext(<Profile />);

    const profileIcon = screen.getByRole('img', { name: /profileicon/i });
    const title = screen.getByTestId('page-title');
    const email = screen.getByRole('heading', { level: 4, name: /teste@teste.com/i });
    const btnDone = screen.getByTestId('profile-done-btn');
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    const btnLogout = screen.getByTestId('profile-logout-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');

    expect(profileIcon && title && email && btnDone && btnFavorite
      && btnLogout && mealsIcon && drinksIcon).toBeInTheDocument();
  });

  test('testa funcinalidade do botão profile', () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    const profileIcon = screen.getByRole('img', { name: /profileicon/i });
    userEvent.click(profileIcon);

    act(() => {
      history.push('/profile');
    });
  });

  test('testa funcinalidade do botão done', () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    const btnDone = screen.getByTestId('profile-done-btn');
    userEvent.click(btnDone);

    act(() => {
      history.push('/done-recipes');
    });
  });

  test('testa funcinalidade do botão favorite', () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    const btnFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(btnFavorite);

    act(() => {
      history.push('/favorite-recipes');
    });
  });

  test('testa funcinalidade do botão logout', () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    const btnLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(btnLogout);

    act(() => {
      history.push('/');
    });
  });

  test('testa funcinalidade do ícone refeições', () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);

    act(() => {
      history.push('/meals');
    });
  });

  test('testa funcinalidade do ícone carne', () => {
    const { history } = renderWithRouterAndContext(<Profile />);
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksIcon);

    act(() => {
      history.push('/drinks');
    });
  });
});
