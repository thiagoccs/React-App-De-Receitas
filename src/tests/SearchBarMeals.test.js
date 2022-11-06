import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetch from '../../cypress/mocks/fetch';
import PageMeals from '../Pages/PageMeals';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import firstLetterMeals from './mocks/firstLetterMeals';

const EXEC_SEARCH = 'exec-search-btn';

describe('Testa o Componente SearchBar', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });

  const SEARCH_TOP_BTN = 'search-top-btn';
  const PAGE_TITLE = 'page-title';
  const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
  const NAME_SEARCH_RADIO = 'name-search-radio';
  const SEARCH_INPUT = 'search-input';
  const EXEC_SEARCH_BTN = 'exec-search-btn';

  it('Testa se ao clicar no icone da lupa, os inputs aparecem', async () => {
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />);
    });
    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    userEvent.click(searchIcon);
    const radioInputs = screen.getByText(/ingredient name first letter/i);
    expect(radioInputs).toBeInTheDocument();
  });
  it('testa o funcionamento do input ingredient', async () => {
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />, '/meals');
    });
    expect(await screen.findByText(/corba/i)).toBeInTheDocument();
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    const ingredient = screen.getByTestId(INGREDIENT_SEARCH_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    expect(screen.getByTestId(PAGE_TITLE)).toBeInTheDocument();

    userEvent.click(ingredient);
    expect(screen.getAllByText(/ingredient/i).length).toEqual(2);
    userEvent.type(searchInput, 'Chicken');
    userEvent.click(execSearchBtn);
  });
  it('testa o funcionamento do input name', async () => {
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />, '/meals');
    });
    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));

    const name = screen.getByTestId(NAME_SEARCH_RADIO);
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    expect(screen.getByTestId(PAGE_TITLE)).toBeInTheDocument();

    userEvent.click(name);
    expect(screen.getAllByText(/name/i).length).toEqual(2);
    userEvent.type(searchInput, 'soup');
    userEvent.click(execSearchBtn);
  });
  it('testa o funcionamento do input first letter', async () => {
    global.fetch = jest.fn(async (url) => ({
      json: () => {
        if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?f=a') {
          return Promise.resolve(firstLetterMeals);
        }
      },
    }));
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />, '/meals');
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const execSearchBtn = screen.getByTestId(EXEC_SEARCH);

    userEvent.click(firstLetter);
    expect(screen.getAllByText(/first letter/i).length).toEqual(2);
    userEvent.type(searchInput, 'a');
    userEvent.click(execSearchBtn);
  });
  it('testa o funcionamento do alert', async () => {
    global.alert = jest.fn();
    await act(async () => {
      renderWithRouterAndContext(<PageMeals />, '/meals');
    });

    userEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    const firstLetter = screen.getByTestId('first-letter-search-radio');
    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const btnProcurar = screen.getByTestId(EXEC_SEARCH_BTN);

    userEvent.click(firstLetter);
    userEvent.type(searchInput, 'aa');
    userEvent.click(btnProcurar);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
});
