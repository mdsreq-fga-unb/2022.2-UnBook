import { faker } from "@faker-js/faker";
import { RenderResult, act, fireEvent } from "@testing-library/react";

const testChildCount = (
	sut: RenderResult,
	fieldName: string,
	count: number
): void => {
	const element = sut.getByTestId(fieldName);
	expect(element.childElementCount).toBe(count);
};

const testElementExists = (sut: RenderResult, fieldName: string): void => {
	const element = sut.getByTestId(fieldName);
	expect(element).toBeTruthy();
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
	act(() => {
		const input = sut.getByTestId(`${fieldName}-status`);
		fireEvent.input(input, { target: { value } });
	});
};
const testStatsForField = (
	sut: RenderResult,
	fieldName: string,
	validationError?: string
): void => {
	const fieldStatusDiv = sut.getByTestId(`${fieldName}-status`);
	expect(fieldStatusDiv.title).toBe(validationError || "Tudo certo!");
};

const testElementText = async (
	sut: RenderResult,
	fieldName: string,
	text: string
): Promise<void> => {
	const element = sut.findByTestId(fieldName);
	expect((await element).textContent).toBe(text);
};

export {
	testChildCount,
	testButtonIsDisabled,
	populateField,
	testStatsForField,
	testElementExists,
	testElementText,
};
