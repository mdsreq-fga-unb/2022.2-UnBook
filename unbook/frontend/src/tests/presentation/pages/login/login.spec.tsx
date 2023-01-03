import React from "react";
import {
	RenderResult,
	cleanup,
	fireEvent,
	render,
} from "@testing-library/react";
import { Login } from "../../../../presentation/pages";
import { IValidation } from "../../../../presentation/protocols/IValidation";

interface ISutTypes {
	sut: RenderResult;
	validationSpy: ValidationSpy;
}

class ValidationSpy implements IValidation {
	errorMessage: string;
	input: object;

	validate(input: object): string {
		this.input = input;
		return this.errorMessage;
	}
}

const makeSut = (): ISutTypes => {
	const validationSpy = new ValidationSpy();
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
		const { sut } = makeSut();
		const emailStatus = sut.getByTestId("email-status");
		expect(emailStatus.title).toBe("Campo obrigatório");
	});

	test("Deve garantir que o título do input password deva ser campo obrigatório", () => {
		const { sut } = makeSut();
		const passwordStatus = sut.getByTestId("password-status");
		expect(passwordStatus.title).toBe("Campo obrigatório");
	});

	describe("Form", () => {
		test("Deve garantir que o validation seja chamado com o email correto", () => {
			const { sut, validationSpy } = makeSut();
			const emailInput = sut.getByTestId("email-status");
			fireEvent.input(emailInput, { target: { value: "any_email" } });
			expect(validationSpy.input).toEqual({ email: "any_email" });
		});

		test("Deve garantir que o validation seja chamado com os valores corretos", () => {
			const { sut, validationSpy } = makeSut();
			const emailInput = sut.getByTestId("email-status");
			fireEvent.input(emailInput, { target: { value: "any_email" } });
			expect(validationSpy.input).toEqual({ email: "any_email" });
		});
	});
});
