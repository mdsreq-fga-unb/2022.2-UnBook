import React from "react";
import {
	RenderResult,
	cleanup,
	fireEvent,
	render,
} from "@testing-library/react";
import { Login } from "../../../../presentation/pages";
import { ValidationSpy } from "../../mocks/validation";
import { faker } from "@faker-js/faker";

interface ISutTypes {
	sut: RenderResult;
	validationSpy: ValidationSpy;
}

const makeSut = (): ISutTypes => {
	const validationSpy = new ValidationSpy();
	validationSpy.errorMessage = faker.random.words();
	const sut = render(<Login validation={validationSpy} />);
	return {
		sut,
		validationSpy,
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
		const { sut, validationSpy } = makeSut();
		const emailStatus = sut.getByTestId("email-status");
		expect(emailStatus.title).toBe(validationSpy.errorMessage);
	});

	test("Deve garantir que o título do input password deva ser campo obrigatório", () => {
		const { sut } = makeSut();
		const passwordStatus = sut.getByTestId("password-status");
		expect(passwordStatus.title).toBe("Campo obrigatório");
	});

	test("Deve garantir que o validation seja chamado com o email correto", () => {
		const { sut, validationSpy } = makeSut();
		const emailInput = sut.getByTestId("email-status");
		const email = faker.internet.email();
		fireEvent.input(emailInput, { target: { value: email } });
		expect(validationSpy.fieldName).toBe("email");
		expect(validationSpy.fieldValue).toBe(email);
	});

	test("Deve garantir que o validation seja chamado com o password corretamente", () => {
		const { sut, validationSpy } = makeSut();
		const passwordInput = sut.getByTestId("password-status");
		const password = faker.internet.password();
		fireEvent.input(passwordInput, { target: { value: password } });
		expect(validationSpy.fieldName).toBe("password");
		expect(validationSpy.fieldValue).toBe(password);
	});

	test("Deve mostrar um erro de email de o Validation falhar", () => {
		const { sut, validationSpy } = makeSut();
		const emailInput = sut.getByTestId("email-status");
		fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
		expect(emailInput.title).toBe(validationSpy.errorMessage);
	});
});
