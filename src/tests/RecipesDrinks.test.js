import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Teste do componente Recipes Drinks', () => {
  jest.setTimeout(10000);
  it('Verifica se existe o button Goat e requisição da Api é feita em /Meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(drinkCategories),
    }));
    const { history } = renderWithRouterAndContext(<App />);
    expect(global.fetch).toBeCalled();
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId('password-input');
    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '12345678');
    const buttonInicial = await screen.findByTestId('login-submit-btn', {}, { timeout: 3000 });
    expect(buttonInicial).toBeEnabled();
    userEvent.click(buttonInicial);
    expect(history.location.pathname).toBe('/meals');
    const btnDrink = screen.getByRole('img', { name: /drinkicon/i });
    await waitFor(() => {
      userEvent.click(btnDrink);
    });
    expect(history.location.pathname).toBe('/drinks');

    const btnCocoa = await screen.findByTestId(
      'Cocoa-category-filter',
      {},
      {
        timeout: 8000,
      },
    );
    // debug();
    expect(btnCocoa).toBeInTheDocument();
    userEvent.click(btnCocoa);
    const coffeImg = await screen.findByRole('img', { name: /castillian hot chocolate/i });
    expect(coffeImg).toBeInTheDocument();
    userEvent.click(btnCocoa);
    const a0 = await screen.findByTestId('0-card-img');

    expect(a0).toBeInTheDocument();
  });
});
