import React from "react";
import { RenderResult, render } from "@testing-library/react";
import { Login } from "../../../../presentation/pages";

interface ISutTypes {
	sut: RenderResult;
}

const makeSut = (): ISutTypes => {
	const sut = render(<Login />);
	return {
		sut,
	};
};

describe("Login Component", () => {
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

	test("Deve garantir que o título do input deva password ser campo obrigatório", () => {
		const { sut } = makeSut();
		const passwordStatus = sut.getByTestId("password-status");
		expect(passwordStatus.title).toBe("Campo obrigatório");
	});
});
