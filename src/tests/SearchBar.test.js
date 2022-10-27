import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageMeals from '../Pages/PageMeals';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testa o Componente SearchBar', () => {
  it('Testa se ao clicar no icone da lupa, os inputs aparecem', () => {
    renderWithRouterAndContext(<PageMeals />);
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const radioInputs = screen.getByText(/ingredient name first letter/i);
    expect(radioInputs).toBeInTheDocument();
  });
  it('Testa se ao buscar o ingrediente chicken, o resultado esperado é renderizado em tela', async () => {
    const { debug } = renderWithRouterAndContext(<PageMeals />);

    const searchIcon = screen.getByTestId('search-top-btn');

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(btnSearch);
    debug();
  });
  it('', () => {});
  it('', () => {});
  it('', () => {});
});
