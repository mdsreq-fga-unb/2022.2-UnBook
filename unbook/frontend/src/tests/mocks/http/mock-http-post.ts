import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../../../database/protocols/http";

const mockPostRequest = (): HttpPostParams<any> => ({
	url: faker.internet.url(),
	body: faker.helpers.objectValue({}),
});

export { mockPostRequest };
