import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageMeals from '../Pages/PageMeals';
import PageDrinks from '../Pages/PageDrinks';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import fetch from '../../cypress/mocks/fetch';

describe('Testa o Componente SearchBar', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';
  const PAGE_TITLE = 'page-title';
  const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
  const SEARCH_INPUT = 'search-input';
  const EXEC_SEARCH = 'exec-search-btn';

  afterEach(() => jest.clearAllMocks());

  it('Testa se ao clicar no icone da lupa, os inputs aparecem', async () => {
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />);
    });
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchIcon);
    const radioInputs = screen.getByText(/ingredient name first letter/i);
    expect(radioInputs).toBeInTheDocument();
  });
  it('testa o funcionamento dos inputs no searchBar na page meals', async () => {
    renderWithRouterAndContext(<PageMeals />);

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    const ingredient = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const name = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    expect(screen.getByTestId(PAGE_TITLE)).toBeInTheDocument();

    userEvent.click(ingredient);
    expect(screen.getAllByText(/ingredient/i).length).toEqual(2);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(execSearchBtn);

    userEvent.click(name);
    expect(screen.getAllByText(/name/i).length).toEqual(2);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(execSearchBtn);

    userEvent.click(firstLetter);
    expect(screen.getAllByText(/first letter/i).length).toEqual(2);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchBtn);

    expect(ingredient && name && firstLetter).toBeInTheDocument();
  });
  it('testa o funcionamento dos inputs no searchBar na page drinks', async () => {
    renderWithRouterAndContext(<PageDrinks />);

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    const ingredient = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const name = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    expect(screen.getByTestId(PAGE_TITLE)).toBeInTheDocument();

    userEvent.click(ingredient);
    expect(screen.getAllByText(/ingredient/i).length).toEqual(2);
    userEvent.type(searchInput, 'kiwi');
    userEvent.click(execSearchBtn);

    userEvent.click(name);
    expect(screen.getAllByText(/name/i).length).toEqual(2);
    userEvent.type(searchInput, 'kiwi');
    userEvent.click(execSearchBtn);

    userEvent.click(firstLetter);
    expect(screen.getAllByText(/first letter/i).length).toEqual(2);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchBtn);

    expect(ingredient && name && firstLetter).toBeInTheDocument();
  });
  it('', () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken')),
    }));
    renderWithRouterAndContext(<PageMeals />);

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    const ingredient = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    userEvent.click(ingredient);

    expect(screen.getAllByText(/ingredient/i).length).toEqual(2);

    userEvent.type(searchInput, 'Chicken');
    userEvent.click(execSearchBtn);

    expect(global.fetch).toBeCalledTimes(2);
  });
  it('', () => { });
});
