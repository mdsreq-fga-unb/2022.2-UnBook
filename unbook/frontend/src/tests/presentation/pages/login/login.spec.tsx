import React from "react";
import {
	RenderResult,
	cleanup,
	fireEvent,
	render,
	waitFor,
} from "@testing-library/react";
import { Login } from "../../../../presentation/pages/login/login";
import {
	ValidationStub,
	AuthenticationSpy,
} from "../../../presentation/mocks/validation";
import { faker } from "@faker-js/faker";
import "vitest-localstorage-mock";
import { InvalidCredentialsError } from "../../../../domain/errors";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

interface ISutTypes {
	sut: RenderResult;
	authenticationSpy: AuthenticationSpy;
}

type SutParams = {
	validationError: string;
};

const makeSut = (params?: SutParams): ISutTypes => {
	const validationStub = new ValidationStub();
	const authenticationSpy = new AuthenticationSpy();
	validationStub.errorMessage = params?.validationError;
	const sut = render(
		<BrowserRouter>
			<Login validation={validationStub} authentication={authenticationSpy} />
		</BrowserRouter>
	);
	return {
		sut,
		authenticationSpy,
	};
};

const simulateValidSubmit = (
	sut: RenderResult,
	email = faker.internet.email(),
	password = faker.internet.password()
): void => {
	populateEmailField(sut, email);
	populatePasswordField(sut, password);
	const submitButton = sut.getByTestId("submit");
	fireEvent.click(submitButton);
};

const populateEmailField = (
	sut: RenderResult,
	email = faker.internet.email()
): void => {
	const emailInput = sut.getByTestId("email-status");
	fireEvent.input(emailInput, {
		target: { value: email },
	});
};

const populatePasswordField = (
	sut: RenderResult,
	password = faker.internet.password()
): void => {
	const passwordInput = sut.getByTestId("password-status");
	fireEvent.input(passwordInput, {
		target: { value: password },
	});
};

describe("Login Component", () => {
	afterEach(cleanup);
	beforeEach(() => {
		localStorage.clear();
	});
	test("Não deve renderizar o spinner e o erro no início", () => {
		const { sut } = makeSut();
		const errorWrapper = sut.getByTestId("error-wrap");
		expect(errorWrapper.childElementCount).toBe(0);
	});

	test("Deve garantir que o botão de entrar esteja desabilitado se a senha e email não estiverem preenchidos", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
		expect(submitButton.disabled).toBe(true);
	});

	test("Deve garantir que o título do input email deva ser campo obrigatório", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		const emailStatus = sut.getByTestId("email-status");
		expect(emailStatus.title).toBe(validationError);
	});

	test("Deve garantir que o título do input password deva ser campo obrigatório", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		const passwordStatus = sut.getByTestId("password-status");
		expect(passwordStatus.title).toBe(validationError);
	});

	test("Deve mostrar um erro de email se o Validation falhar", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		const emailInput = sut.getByTestId("email-status");
		fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
		expect(emailInput.title).toBe(validationError);
	});

	test("Deve mostrar um erro de password se o Validation falhar", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		const passwordInput = sut.getByTestId("password-status");
		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});
		expect(passwordInput.title).toBe(validationError);
	});

	test("Deve habilitar o botão de submit se os valores passados forem válidos", () => {
		const { sut } = makeSut();
		populateEmailField(sut);
		populatePasswordField(sut);
		const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
		expect(submitButton.disabled).toBe(false);
	});

	test("Deve exibir o ícone de carregando quando o botão de submit for clicado", () => {
		const { sut } = makeSut();
		simulateValidSubmit(sut);
		const spinner = sut.getByTestId("spinner");
		expect(spinner).toBeTruthy();
	});

	test("Deve chamar o Authentication com os valores corretos", () => {
		const { sut, authenticationSpy } = makeSut();
		const email = faker.internet.email();
		const password = faker.internet.password();
		simulateValidSubmit(sut, email, password);
		expect(authenticationSpy.params).toEqual({
			email,
			password,
		});
	});

	test("Deve chamar o Authentication apenas uma vez", () => {
		const { sut, authenticationSpy } = makeSut();
		simulateValidSubmit(sut);
		simulateValidSubmit(sut);
		expect(authenticationSpy.callsCount).toBe(1);
	});

	test("Deve chamar o Authentication apenas uma vez", () => {
		const validationError = faker.random.words();
		const { sut, authenticationSpy } = makeSut({ validationError });
		populateEmailField(sut);
		fireEvent.submit(sut.getByTestId("form"));
		expect(authenticationSpy.callsCount).toBe(0);
	});

	test("Deve mostrar o erro se a autenticação falhar", async () => {
		const { sut, authenticationSpy } = makeSut();
		const error = new InvalidCredentialsError();
		vi.spyOn(authenticationSpy, "auth").mockReturnValueOnce(
			Promise.reject(error)
		);
		simulateValidSubmit(sut);
		const errorWrap = sut.getByTestId("error-wrap");
		await waitFor(() => errorWrap);
		const mainError = sut.findByTestId("main-error");
		expect((await mainError).textContent).toBe(error.message);
		expect(errorWrap.childElementCount).toBe(1);
	});

	test("Deve adicionar um accessToken no localstorage caso a autenticação tiver sucesso", async () => {
		const { sut, authenticationSpy } = makeSut();
		simulateValidSubmit(sut);
		await waitFor(() => sut.findByTestId("form"));
		expect(localStorage.setItem).toHaveBeenCalledWith(
			"accessToken",
			authenticationSpy.account.accessToken
		);
	});

	test("Deve ir para página de criar conta ao clicar no link de cadastro", async () => {
		const { sut } = makeSut();
		const signup = sut.getByTestId("signup");
		fireEvent.click(signup);

		expect(location.pathname).toBe("/signup");
	});
});
