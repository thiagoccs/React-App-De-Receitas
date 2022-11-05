import { act, screen } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import RecipeInProgress from '../Pages/RecipeInProgress';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import fetch from '../../cypress/mocks/fetch';

describe('Testes da pagina RecipeInProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn(fetch);
  });
  afterEach(() => jest.clearAllMocks());
  it('', async () => {
    await act(async () => {
      renderWithRouterAndContext(<RecipeInProgress />, '/meals/52771/in-progress');
    });
    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();

    userEvent.click(await screen.findByTestId('0-ingredient-step'));
    expect(await screen.findByTestId('0-ingredient-step')).toBeChecked();
  });
  it('', async () => {
    await act(async () => {
      renderWithRouterAndContext(<RecipeInProgress />, '/drinks/178319/in-progress');
    });
    expect(await screen.findByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('finish-recipe-btn')).toBeInTheDocument();
  });
});
