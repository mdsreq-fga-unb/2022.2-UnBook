import React from "react";
import {
	RenderResult,
	cleanup,
	fireEvent,
	render,
	waitFor,
} from "@testing-library/react";
import { Login } from "../../../../src/presentation/pages/login/login";
import { ValidationStub, AuthenticationSpy } from "../../mocks/validation";
import { faker } from "@faker-js/faker";
import { InvalidCredentialsError } from "../../../../src/domain/errors";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { SaveAccessTokenMock } from "../../mocks/validation/mock-save-access-token";
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
describe("Signup Component", () => {
	afterEach(cleanup);

	test("Deve começar com um estado incial", () => {
		const { sut } = makeSut();
		testChildCount(sut, "error-wrap", 0);
		testButtonIsDisabled(sut, "submit", true);
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
});
