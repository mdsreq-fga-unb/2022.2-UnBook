import React from 'react';
import Register from '../../pages/register';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import { render, fireEvent, wait } from '@testing-library/react';

jest.mock('axios');

const makeSut = () => {
  const { getByTestId } = render(<Register />);
  const registerButton = getByTestId('register-button');
  const nameInput = getByTestId('name-input');
  const emailInput = getByTestId('email-input');
  const passwordInput = getByTestId('password-input');
  const secretInput = getByTestId('secret-input');
  const select = getByTestId('select-input');
  return { registerButton, nameInput, emailInput, passwordInput, secretInput, select };
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
    const { getByPlaceholderText } = render(<Register />);
    const nameInput = getByPlaceholderText('Digite seu nome');
    const emailInput = getByPlaceholderText('Digite seu e-mail');
    const passwordInput = getByPlaceholderText('Digite sua senha');
    const secretInput = getByPlaceholderText('Digite sua resposta aqui');

    // simulate changing the name input
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    expect(nameInput.value).toBe('John Doe');

    // simulate changing the email input
    fireEvent.change(emailInput, { target: { value: 'johndoe@example.com' } });
    expect(emailInput.value).toBe('johndoe@example.com');

    // simulate changing the password input
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');

    // simulate changing the secret input
    fireEvent.change(secretInput, { target: { value: 'Azul' } });
    expect(secretInput.value).toBe('Azul');
  });

  test('envia o formulário com os dados corretamente', () => {
    const handleSubmit = jest.fn();
    axios.post.mockResolvedValue({ data: {} });
    const { getByTestId } = render(<Register onSubmit={handleSubmit} />);

    const name = faker.name.fullName();
    const email = faker.internet.email();
    const password= faker.internet.password();
    const question = 'Qual é o nome do seu melhor amigo?';
    const friendName = faker.name.fullName();

    const nameInput = getByTestId('name-input');
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const secretInput = getByTestId('secret-input');
    const registerButton = getByTestId('register-button');

    fireEvent.change(nameInput, { target: { value: name} });
    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(secretInput, { target: { value: friendName } });
    fireEvent.click(registerButton);

    expect(axios.post).toHaveBeenCalledWith('http://localhost:8000/api/register', {
      name: name,
      email: email,
      password: password,
      secret: friendName,
    });
  });
});