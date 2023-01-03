import React from "react";
import { render } from "@testing-library/react";
import { Login } from "../../../../presentation/pages";
import App from "../../../../App";

describe("Login Component", () => {
	test("should render", () => {
		render(<App />);
	});
});
