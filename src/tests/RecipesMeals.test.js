import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Teste do componente Recipes', () => {
  jest.setTimeout(10000);
  it('Verifica se existe o button Goat e requisição da Api é feita em /Meals', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));
    const { history } = renderWithRouterAndContext(<App />);
    expect(global.fetch).toBeCalled();
    const email = screen.getByRole('textbox');
    const password = screen.getByTestId('password-input');
    userEvent.type(email, 'trybe@trybe.com');
    userEvent.type(password, '12345678');
    const buttonInicial = screen.getByRole('button', { name: /entrar/i });
    expect(buttonInicial).toBeEnabled();
    await waitFor(() => {
      userEvent.click(buttonInicial);
    });
    expect(history.location.pathname).toBe('/meals');
    const btnGoat = await screen.findByTestId('Goat-category-filter', {}, {
      timeout: 8000,
    });
    await waitFor(() => {
      expect(btnGoat).toBeTruthy();
    });
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
  });
});
