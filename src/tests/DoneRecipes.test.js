import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoneRecipes from '../Pages/DoneRecipes';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import localStorageMock from './mocks/LocalStorageMock';
import LocalStorageMock from './mocks/LocalStorageMock';

describe('Testa o Componente DoneRecipes', () => {
//   afterEach(() => {
//     localStorage.clear();
//   });
  //   afterEach(() => jest.clearAllMocks());
  const urlMeal = 'http://localhost:3000/meals/53060';
  const urlDrink = 'http://localhost:3000/drinks/13501';
  const doneRecipes = 'done-recipes';
  const paraTestes = [
    // << Apagar e substitutir por array vindo do LocalStorage
    {
      id: '53060',
      name: 'Burek',
      type: 'meal',
      nationality: 'Croatian',
      category: 'Side',
      tags: ['teste', 'teste2'],
      doneDate: '01/11/2022',
      image:
        'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
      alcoholicOrNot: '',
    },
    {
      id: '13501',
      name: 'ABC',
      type: 'drink',
      nationality: '',
      category: 'Shot',
      tags: [],
      doneDate: '01/11/2022',
      image:
        'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      alcoholicOrNot: 'Alcoholic',
    },
  ];

  it('Testa se está no pathname "done-recipes"', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(
        <DoneRecipes />,
        doneRecipes,
      );
      expect(history.location.pathname).toBe(doneRecipes);
    });
    const title = await screen.findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });

  it('Testa Os botoões de filtros', async () => {
    LocalStorageMock(paraTestes);
    await act(async () => {
      renderWithRouterAndContext(<DoneRecipes />, doneRecipes);
    });
    const btnMeals = screen.getByRole('button', { name: /meals/i });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });
    const btnAll = screen.getByRole('button', { name: /all/i });
    expect(btnMeals && btnDrinks && btnAll).toBeDefined();

    const imgBurek = screen.queryByRole('img', { name: /burek/i });
    const imgABC = screen.queryByRole('img', { name: /abc/i });
    expect(imgBurek && imgABC).toBeInTheDocument();

    userEvent.click(btnMeals);
    expect(imgBurek).toBeInTheDocument();
    waitFor(() => {
      expect(imgABC).not.toBeInTheDocument();
    });
    waitFor(() => {
      userEvent.click(btnAll);
      expect(imgBurek && imgABC).toBeInTheDocument();
    });
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    expect(shareBtn).toBeInTheDocument();
  });

  it('Testa o botão da primeira IMG Done Recipes', async () => {
    localStorageMock.clear();
    LocalStorageMock(paraTestes);
    await act(async () => {
      renderWithRouterAndContext(<DoneRecipes />, doneRecipes);
    });
    const btnBurek = screen.getByRole('button', { name: /burek burek/i });
    expect(btnBurek).toBeInTheDocument();
    userEvent.click(btnBurek);
    const imgBurek = screen.queryByRole('img', { name: /burek/i });
    expect(imgBurek).toBeInTheDocument();
  });

  it('Testa se o link de share está copiando', async () => {
    const mockClipboard = {
      writeText: jest.fn(),
    };
    global.navigator.clipboard = mockClipboard;
    LocalStorageMock(paraTestes);
    await act(async () => {
      renderWithRouterAndContext(<DoneRecipes />, doneRecipes);
    });
    const shareBtn = await screen.findByTestId('0-horizontal-share-btn');
    userEvent.click(shareBtn);
    expect(navigator.clipboard.writeText).toBeCalledWith(urlMeal);
  });

  it('Testa o botão Drinks DoneRecipes', async () => {
    LocalStorageMock(paraTestes);
    await act(async () => {
      renderWithRouterAndContext(<DoneRecipes />, doneRecipes);
    });
    const btnDrinks = screen.getByRole('button', { name: /drinks/i });
    userEvent.click(btnDrinks);
    const imgBurek = screen.queryByRole('img', { name: /burek/i });
    const imgABC = screen.queryByRole('img', { name: /abc/i });
    expect(imgABC).toBeInTheDocument();
    waitFor(() => {
      expect(imgBurek).not.toBeInTheDocument();
    });
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
    const btnShareDrink = await screen.findByTestId('1-horizontal-share-btn');
    userEvent.click(btnShareDrink);
    expect(navigator.clipboard.writeText).toBeCalledWith(urlDrink);
    const btnAbc = screen.getByRole('button', { name: /abc abc/i });
    userEvent.click(btnAbc);
  });
});
