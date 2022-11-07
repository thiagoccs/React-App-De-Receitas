import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';
import mealCategories from '../../cypress/mocks/mealCategories';

describe('Teste do componente Recipes', () => {
  jest.setTimeout(10000);
  it('Verifica se ao clicar na no button Profile, é redirecionado para /Profile', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.resolve({
      json: () => Promise.resolve(mealCategories),
    }));
    const { history } = renderWithRouterAndContext(<App />);
    expect(global.fetch).toBeCalled();
    act(() => {
      history.push('/meals');
    });
    const btnGoat = await screen.findByRole(
      'button',
      { name: /goat/i },
      { timeout: 3000 },
    );
    expect(btnGoat).toBeDefined();
    const image01 = await screen.findByTestId(
      '1-card-img',
      {},
      { timeout: 3000 },
    );
    const CorbaText = await screen.findByText(/corba/i, {}, { timeout: 3000 });
    expect(image01 && CorbaText).toBeInTheDocument();
    userEvent.click(btnGoat);
    const titleMbuzi = await screen.findByText(
      /mbuzi choma \(roasted goat\)/i,
      {},
      { timeout: 3000 },
    );
    expect(titleMbuzi).toBeInTheDocument();
    expect(CorbaText).not.toBeInTheDocument();
    const btnAll = screen.getByRole('button', { name: /all/i });
    userEvent.click(btnAll);
    const CorbaText2 = await screen.findByText(/corba/i, {}, { timeout: 3000 });
    expect(CorbaText2).toBeInTheDocument();
  });
});
