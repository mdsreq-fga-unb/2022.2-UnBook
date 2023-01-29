import React from 'react';
import Register from '../../pages/register';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { render, fireEvent, act } from '@testing-library/react';

jest.mock('axios');

const makeSut = () => {
  const handleSubmit = jest.fn();
  const { getByTestId } = render(<Register onSubmit={handleSubmit}/>);
  const registerButton = getByTestId('register-button');
  const nameInput = getByTestId('name-input');
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const secretInput = getByTestId('secret-input');
  const select = getByTestId('select-input');
  return { registerButton, nameInput, emailInput, passwordInput, secretInput, select };
};

const makeFaker = () => {
  const name = faker.name.fullName();
  const email = faker.internet.email();
  const password = faker.internet.password();
  const secret = faker.name.firstName();
  return { name, email, password, secret };
};

describe('Página de Registro', () => {
  beforeEach(() => {
    axios.post.mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renderiza o formulário corretamente', () => {
    const { registerButton, nameInput, emailInput, passwordInput, secretInput, select } = makeSut();
    
    expect(registerButton).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(secretInput).toBeInTheDocument();
    expect(select).toBeInTheDocument();
  });

  test('atualiza os states corretamente quando os inputs mudam', () => {
    const { nameInput, emailInput, passwordInput, secretInput } = makeSut();

    act(() => {
      fireEvent.change(nameInput, { target: { value: 'John Doe' } });
      fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(secretInput, { target: { value: 'Azul' } });
    });
    
    
    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('johndoe@example.com');
    expect(passwordInput.value).toBe('password123');
    expect(secretInput.value).toBe('Azul'); 
  });

  test('envia o formulário com os dados corretamente', () => {
    axios.post.mockResolvedValue({ data: {} });
    const { registerButton, nameInput, emailInput, passwordInput, secretInput, select } = makeSut();
    const { name, email, password, secret } = makeFaker();

    act(() => {
      fireEvent.change(nameInput, { target: { value: name} });
      fireEvent.change(emailInput, { target: { value: email } });
      fireEvent.change(passwordInput, { target: { value: password } });
      fireEvent.change(secretInput, { target: { value: secret } });
      fireEvent.click(registerButton);
    });

    expect(axios.post).toHaveBeenCalledWith(`${process.env.NEXT_PUBLIC_API}/register`, {
      name: name,
      email: email,
      password: password,
      secret: secret,
    });
  });
});