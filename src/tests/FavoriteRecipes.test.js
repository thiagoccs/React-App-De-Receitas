import { act, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import DoneRecipes from '../Pages/DoneRecipes';
import Favorites from '../Pages/FavoriteRecipes';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
// import localStorageMock from './mocks/LocalStorageMock';

describe('Testa o Componente FavoriteRecipes', () => {
  const favoriteRecipes = 'favorite-recipes';
  it('Testa se está no pathname "favorite-recipes"', async () => {
    await act(async () => {
      const { history } = renderWithRouterAndContext(
        <Favorites />,
        favoriteRecipes,
      );
      expect(history.location.pathname).toBe(favoriteRecipes);
    });
    const title = await screen.findByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
