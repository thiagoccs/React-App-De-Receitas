// import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import { act } from 'react-dom/test-utils';
// import PageMeals from '../Pages/PageMeals';
// import renderWithRouterAndContext from './helpers/renderWithRouterAndContext';

// describe('Teste do componente HEADER', () => {
//   it('Verifica se ao clicar na no button Profile, é redirecionado para /Profile', () => {
//     const { history } = renderWithRouterAndContext(<PageMeals />);
//     console.log(history);
//     act(() => {
//       history.push('/profile');
//     });
//     const buttonProfile = screen.getByRole('button', { name: /profileicon/i });
//     expect(buttonProfile).toBeInTheDocument();
//     userEvent.click(buttonProfile);
//     expect(history.location.pathname).toBe('/profile');
//   });
// });
