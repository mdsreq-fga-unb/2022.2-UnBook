import React from "react";
import {
	RenderResult,
	cleanup,
	fireEvent,
	render,
	waitFor,
} from "@testing-library/react";
import { ValidationStub } from "../../mocks/validation";
import { faker } from "@faker-js/faker";
import { BrowserRouter } from "react-router-dom";
import { SignUp } from "../../../../src/presentation/pages/signup/signup";
import {
	populateField,
	testButtonIsDisabled,
	testChildCount,
	testStatsForField,
} from "../../mocks/form-helper";

interface ISutTypes {
	sut: RenderResult;
}

type SutParams = {
	validationError: string;
};

const makeSut = (params?: SutParams): ISutTypes => {
	const validationStub = new ValidationStub();
	validationStub.errorMessage = params?.validationError;
	const sut = render(
		<BrowserRouter>
			<SignUp validation={validationStub} />
		</BrowserRouter>
	);
	return {
		sut,
	};
};

const simulateValidSubmit = async (
	sut: RenderResult,
	name = faker.name.firstName(),
	email = faker.internet.email(),
	password = faker.internet.password()
): Promise<void> => {
	populateField(sut, "name", name);
	populateField(sut, "email", email);
	populateField(sut, "password", password);
	populateField(sut, "passwordConfirmation", password);
	const form = sut.getByTestId("form");
	fireEvent.submit(form);
	await waitFor(() => form);
};

describe("Signup Component", () => {
	afterEach(cleanup);

	test("Deve começar com um estado incial", () => {
		const { sut } = makeSut();
		testChildCount(sut, "error-wrap", 0);
		const submitButton = sut.getByTestId("submit") as HTMLButtonElement;
		expect(submitButton.disabled).toBe(false);
	});

	test("Deve mostrar um name error se a validação falhar", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		populateField(sut, "name");
		testStatsForField(sut, "name", validationError);
	});

	test("Deve mostrar um email error se a validação falhar", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		populateField(sut, "email");
		testStatsForField(sut, "email", validationError);
	});

	test("Deve mostrar um password error se a validação falhar", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		populateField(sut, "password");
		testStatsForField(sut, "password", validationError);
	});

	test("Deve mostrar um passwordConfirmation error se a validação falhar", () => {
		const validationError = faker.random.words();
		const { sut } = makeSut({ validationError });
		populateField(sut, "passwordConfirmation");
		testStatsForField(sut, "passwordConfirmation", validationError);
	});

	test("Deve habilitar o botão de submit se os valores passados forem válidos", () => {
		const { sut } = makeSut();
		populateField(sut, "name");
		populateField(sut, "email");
		populateField(sut, "password");
		populateField(sut, "passwordConfirmation");
		testButtonIsDisabled(sut, "submit", false);
	});

	test("Deve exibir o ícone de carregando quando o botão de submit for clicado", () => {
		const { sut } = makeSut();
		simulateValidSubmit(sut);
		const spinner = sut.getByTestId("spinner");
		expect(spinner).toBeTruthy();
	});
});
