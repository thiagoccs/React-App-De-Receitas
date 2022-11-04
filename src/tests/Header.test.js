import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

describe('Teste do componente HEADER', () => {
  it('Verifica se ao clicar na no button Profile, é redirecionado para /Profile', () => {
    const mockId = 'user';
    const mockJson = { email: 'teste@teste.com' };
    window.localStorage.setItem(mockId, JSON.stringify(mockJson));

    const { history } = renderWithRouterAndContext(<App />);
    act(() => {
      history.push('/meals');
    });
    const buttonProfile = screen.getByRole('button', { name: /profileicon/i });
    expect(buttonProfile).toBeInTheDocument();
    userEvent.click(buttonProfile);
    expect(history.location.pathname).toBe('/profile');
  });
});
