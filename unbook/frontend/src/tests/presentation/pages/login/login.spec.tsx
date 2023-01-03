import React from "react";
import { render } from "@testing-library/react";
import { Login } from "../../../../presentation/pages";

describe("Login Component", () => {
	test("Não deve renderizar o spinner e o erro no início", () => {
		const { getByTestId } = render(<Login />);
		const errorWrapper = getByTestId("errorWrapper");
		expect(errorWrapper.childElementCount).toBe(0);
	});
});
