import { faker } from "@faker-js/faker";
import { IAddAccountParams } from "../../../src/domain/usecases/IAddAccountUseCase";

const mockAddAccountParams = (): IAddAccountParams => {
	const password = faker.internet.password();
	return {
		name: faker.name.firstName(),
		email: faker.internet.email(),
		password: password,
		passwordConfirmation: password,
	};
};

export { mockAddAccountParams };
