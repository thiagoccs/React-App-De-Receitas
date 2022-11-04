import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import context from '../../context/context';
import Provider from '../../context/Provider';

const renderWithRouterAndContext = (component, path = '/') => {
  const history = createMemoryHistory({ initialEntries: [path] });
  return ({
    ...render(
      <Router history={ history }>
        <Provider value={ context }>
          {component}
        </Provider>
      </Router>,
    ),
    history,
  });
};

export default renderWithRouterAndContext;
