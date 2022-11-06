import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Teste do componente RecipeDetails', () => {
  jest.setTimeout(8000);
  it('Verifica se ao clicar na no button Profile, é redirecionado para /Profile', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));
    const { history } = renderWithRouterAndContext(<App />);
    expect(global.fetch).toBeCalled();
    act(() => {
      history.push('/meals');
    });
    const imgCorba = await screen.findByTestId('0-card-img', {}, { timeout: 4000 });
    userEvent.click(imgCorba);
    expect(history.location.pathname).toBe('/meals/52977');
    const btnStart = await screen.findByTestId('start-recipe-btn');
    expect(btnStart).toBeInTheDocument();
    const photo = await screen.findByTestId('recipe-photo', {}, { timeout: 4000 });
    const video = await screen.findByTestId('video', {}, { timeout: 4000 });
    expect(photo && video).toBeInTheDocument();
  });
});
