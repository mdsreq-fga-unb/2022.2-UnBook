import React from "react";
import {
	RenderResult,
	cleanup,
	fireEvent,
	render,
} from "@testing-library/react";
import { Login } from "../../../../presentation/pages/login/login";
import {
	ValidationStub,
	AuthenticationSpy,
} from "../../../presentation/mocks/validation";
import { faker } from "@faker-js/faker";

interface ISutTypes {
	sut: RenderResult;
	validationStub: ValidationStub;
	authenticationSpy: AuthenticationSpy;
}

const makeSut = (): ISutTypes => {
	const validationStub = new ValidationStub();
	const authenticationSpy = new AuthenticationSpy();
	validationStub.errorMessage = faker.random.words();
	const sut = render(
		<Login validation={validationStub} authentication={authenticationSpy} />
	);
	return {
		sut,
		validationStub,
		authenticationSpy,
	};
};

describe("Login Component", () => {
	afterEach(cleanup);
	test("Não deve renderizar o spinner e o erro no início", () => {
		const { sut } = makeSut();
		const errorWrapper = sut.getByTestId("errorWrapper");
		expect(errorWrapper.childElementCount).toBe(0);
	});

	test("Deve garantir que o botão de entrar esteja desabilitado se a senha e email não estiverem preenchidos", () => {
		const { sut } = makeSut();
		const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
		expect(submitButton.disabled).toBe(true);
	});

	test("Deve garantir que o título do input email deva ser campo obrigatório", () => {
		const { sut, validationStub } = makeSut();
		const emailStatus = sut.getByTestId("email-status");
		expect(emailStatus.title).toBe(validationStub.errorMessage);
	});

	test("Deve garantir que o título do input password deva ser campo obrigatório", () => {
		const { sut, validationStub } = makeSut();
		const passwordStatus = sut.getByTestId("password-status");
		expect(passwordStatus.title).toBe(validationStub.errorMessage);
	});

	test("Deve mostrar um erro de email se o Validation falhar", () => {
		const { sut, validationStub } = makeSut();
		const emailInput = sut.getByTestId("email-status");
		fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
		expect(emailInput.title).toBe(validationStub.errorMessage);
	});

	test("Deve mostrar um erro de password se o Validation falhar", () => {
		const { sut, validationStub } = makeSut();
		const passwordInput = sut.getByTestId("password-status");
		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});
		expect(passwordInput.title).toBe(validationStub.errorMessage);
	});

	test("Deve habilitar o botão de submit se os valores passados forem válidos", () => {
		const { sut, validationStub } = makeSut();
		validationStub.errorMessage = null;
		const emailInput = sut.getByTestId("email-status");
		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});
		const passwordInput = sut.getByTestId("password-status");
		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});
		const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
		expect(submitButton.disabled).toBe(false);
	});

	test("Deve exibir o ícone de carregando quando o botão de submit for clicado", () => {
		const { sut, validationStub } = makeSut();
		validationStub.errorMessage = null;
		const emailInput = sut.getByTestId("email-status");
		fireEvent.input(emailInput, {
			target: { value: faker.internet.email() },
		});
		const passwordInput = sut.getByTestId("password-status");
		fireEvent.input(passwordInput, {
			target: { value: faker.internet.password() },
		});
		const submitButton = sut.getByTestId("submit");
		fireEvent.click(submitButton);
		const spinner = sut.getByTestId("spinner");
		expect(spinner).toBeTruthy();
	});

	test("Deve chamar o Authentication com os valores corretos", () => {
		const { sut, validationStub, authenticationSpy } = makeSut();
		validationStub.errorMessage = null;
		const emailInput = sut.getByTestId("email-status");
		const email = faker.internet.email();
		fireEvent.input(emailInput, {
			target: { value: email },
		});
		const passwordInput = sut.getByTestId("password-status");
		const password = faker.internet.password();
		fireEvent.input(passwordInput, {
			target: { value: password },
		});
		const submitButton = sut.getByTestId("submit");
		fireEvent.click(submitButton);
		expect(authenticationSpy.params).toEqual({
			email,
			password,
		});
	});
});
