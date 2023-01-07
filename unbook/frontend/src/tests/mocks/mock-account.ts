import { IAccountModel } from "../../domain/models/IAccountModel";
import { IAuthenticationParams } from "../../domain/usecases/IAuthenticationUseCase";
import { faker } from "@faker-js/faker";

const mockAuthentication = (): IAuthenticationParams => {
	return {
		email: faker.internet.email(),
		password: faker.internet.password(),
	};
};

const mockAccountModel = (): IAccountModel => {
	return {
		accessToken: faker.datatype.uuid(),
	};
};

export { mockAuthentication, mockAccountModel };
