import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { UserContext, UserProvider } from '../../context';

afterEach(cleanup);

describe('UserProvider', () => {
  test('deve renderizar os componentes filhos', () => {
    const { getByTestId } = render(
      <UserProvider>
        <div data-testid="child-component">Child Component</div>
      </UserProvider>
    );

    expect(getByTestId('child-component')).toBeInTheDocument();
  });

  test('should armazenar o usuário no localStorage', () => {
    window.localStorage.setItem('auth', JSON.stringify({ user: { name: 'John Doe' }, token: 'abc' }));

    const { getByTestId } = render(
      <UserProvider>
        <UserContext.Consumer>
          {([state, setState]) => (
            <div data-testid="child-component">
              {state.user.name}
            </div>
          )}
        </UserContext.Consumer>
      </UserProvider>
    );

    expect(getByTestId('child-component')).toHaveTextContent('John Doe');
  });
});
