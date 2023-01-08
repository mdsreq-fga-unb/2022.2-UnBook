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

interface ISutTypes {
	sut: RenderResult;
}

const makeSut = (): ISutTypes => {
	const sut = render(
		<BrowserRouter>
			<SignUp />
		</BrowserRouter>
	);
	return {
		sut,
	};
};

const testChildCount = (
	sut: RenderResult,
	fieldName: string,
	count: number
): void => {
	const element = sut.getByTestId(fieldName);
	expect(element.childElementCount).toBe(count);
};

const testButtonIsDisabled = (
	sut: RenderResult,
	fieldName: string,
	isDisabled: boolean
): void => {
	const button = sut.getByTestId(fieldName) as HTMLButtonElement;
	expect(button.disabled).toBe(isDisabled);
};

describe("Signup Component", () => {
	test("Deve começar com um estado incial", () => {
		const { sut } = makeSut();
		testChildCount(sut, "error-wrap", 0);
		testButtonIsDisabled(sut, "submit", true);
	});
});
