import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import Nav from '../../components/Nav';
import { UserContext } from '../../context';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    push: jest.fn(),
    pathname: '/'
  })),
}));

const user = {
  name: 'Maciel',
};

const createTestContext = (state) => {
  return {
    state,
    setState: jest.fn(),
  };
};

describe('Componente Nav', () => { 
  describe('Testando o componente Nav', () => {
    test('deve renderizar o componente corretamente', () => {
      const initialState = null;
      const { getByTestId } = render(
        <UserContext.Provider value={[initialState, jest.fn()]}>
          <Nav />
        </UserContext.Provider>
      );
      const homeLink = getByTestId('home-link');
  
      expect(homeLink).toBeInTheDocument();
      expect(homeLink.textContent).toBe('UnBook');
    });

    test("renderiza o link de home", () => {
      const { getByTestId } = render(
        <UserContext.Provider value={{ state: null }}>
          <Nav />
        </UserContext.Provider>
      );
  
      const homeLink = getByTestId("home-link");
  
      expect(homeLink.textContent).toBe("UnBook");
    });
 

    test("deve exibir o link de login quando o usuário não está autenticado", () => {
      const initialState = null;
    
      const { getByTestId } = render(
        <UserContext.Provider value={[initialState, jest.fn()]}>
          <Nav />
        </UserContext.Provider>
      );
      const loginLink = getByTestId("login-link");
    
      expect(loginLink).toBeInTheDocument();
      expect(loginLink.textContent).toBe("Login");
    });

    test('deve exibir o link de logout quando o usuário está autenticado', () => {
      const { getByTestId } = render(
        <UserContext.Provider value={[user, jest.fn()]}>
          <Nav />
        </UserContext.Provider>
      );
      const logoutLink = getByTestId('logout-link');

      expect(logoutLink).toBeInTheDocument();
      expect(logoutLink.textContent).toBe('Sair');
    });
  });
});

