import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Teste do componente Recipes', () => {
  it('Verifica se ao clicar na no button Profile, é redirecionado para /Profile', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));
    const { history } = renderWithRouterAndContext(<App />);
    expect(global.fetch).toBeCalled();
    act(() => {
      history.push('/meals');
    });
    const btnGoat = screen.findByRole('button', { name: /goat/i });
    expect(btnGoat).toBeDefined();
  });
});
