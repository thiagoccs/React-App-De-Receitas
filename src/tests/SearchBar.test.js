import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
// import { meals } from '../../cypress/mocks/meals';
// import App from '../App';
// import SearchBar from '../components/SearchBar';
import PageMeals from '../Pages/PageMeals';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testa o Componente SearchBar', () => {
  // const email = 'teste@teste.com';
  // const password = '1234567';
  const SEARCH_TOP_BTN = 'search-top-btn';
  it('Testa se ao clicar no icone da lupa, os inputs aparecem', async () => {
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />);
    });
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchIcon);
    const radioInputs = screen.getByText(/ingredient name first letter/i);
    expect(radioInputs).toBeInTheDocument();
  });
  it('Testa se ao buscar o ingrediente chicken, o resultado esperado é renderizado em tela', async () => {
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />);
    });
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);

    userEvent.click(searchIcon);

    const inputSearch = screen.getByTestId('search-input');
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(inputSearch, 'chicken');
    userEvent.click(btnSearch);
  });
  it('testa o funcionamento dos inputs no searchBar', async () => {
    const { debug } = renderWithRouterAndContext(<PageMeals />);

    waitFor(() => {
      userEvent.click(screen.getByTestId('search-top-btn'));
    });

    const ingredient = await screen.findByTestId('ingredient-search-radio', {}, { timeout: 4000 });
    const name = await screen.findByTestId('name-search-radio');
    const firstLetter = await screen.findByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');

    expect(screen.getByTestId('page-title')).toBeInTheDocument();

    userEvent.click(ingredient);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(screen.getByTestId('exec-search-btn'));

    global.fetch = jest.fn(fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken'));

    // expect(global.fetch).toBeCalledTimes(1);

    expect(screen.getAllByText(/ingredient/i).length).toEqual(2);

    userEvent.click(name);
    userEvent.click(firstLetter);

    expect(ingredient && name && firstLetter).toBeInTheDocument();

    debug();
  });
  it('', () => { });
  it('', () => { });
});
