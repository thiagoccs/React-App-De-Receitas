import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageMeals from '../Pages/PageMeals';
import PageDrinks from '../Pages/PageDrinks';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Testa o Componente SearchBar', () => {
  const SEARCH_TOP_BTN = 'search-top-btn';
  const PAGE_TITLE = 'page-title';
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

    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = 'exec-search-btn';

    expect(screen.getByTestId(PAGE_TITLE)).toBeInTheDocument();

    userEvent.click(ingredient);
    expect(screen.getAllByText(/ingredient/i).length).toEqual(2);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(screen.getByTestId(execSearchBtn));

    userEvent.click(name);
    expect(screen.getAllByText(/name/i).length).toEqual(2);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(screen.getByTestId(execSearchBtn));

    userEvent.click(firstLetter);
    expect(screen.getAllByText(/first letter/i).length).toEqual(2);
    userEvent.type(searchInput, 'a');
    userEvent.click(screen.getByTestId(execSearchBtn));

    expect(ingredient && name && firstLetter).toBeInTheDocument();
  });
  it('testa o funcionamento dos inputs no searchBar na page drinks', async () => {
    renderWithRouterAndContext(<PageDrinks />);

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId('search-input');
    const execSearchBtn = 'exec-search-btn';

    expect(screen.getByTestId(PAGE_TITLE)).toBeInTheDocument();

    userEvent.click(ingredient);
    expect(screen.getAllByText(/ingredient/i).length).toEqual(2);
    userEvent.type(searchInput, 'kiwi');
    userEvent.click(screen.getByTestId(execSearchBtn));

    userEvent.click(name);
    expect(screen.getAllByText(/name/i).length).toEqual(2);
    userEvent.type(searchInput, 'kiwi');
    userEvent.click(screen.getByTestId(execSearchBtn));

    userEvent.click(firstLetter);
    expect(screen.getAllByText(/first letter/i).length).toEqual(2);
    userEvent.type(searchInput, 'a');
    userEvent.click(screen.getByTestId(execSearchBtn));

    expect(ingredient && name && firstLetter).toBeInTheDocument();
  });
  it('', () => { });
  it('', () => { });
});
