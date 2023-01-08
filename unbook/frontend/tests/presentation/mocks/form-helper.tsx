import { faker } from "@faker-js/faker";
import { RenderResult, fireEvent } from "@testing-library/react";

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

const populateField = (
	sut: RenderResult,
	fieldName: string,
	value = faker.random.word()
): void => {
	const input = sut.getByTestId(`${fieldName}-status`);
	fireEvent.input(input, { target: { value } });
};

export { testChildCount, testButtonIsDisabled, populateField };
