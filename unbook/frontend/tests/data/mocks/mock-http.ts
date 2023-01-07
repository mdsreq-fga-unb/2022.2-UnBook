import { faker } from "@faker-js/faker";

type HttpMethod = "post" | "get" | "put" | "delete";

type HttpRequest = {
	url: string;
	method: HttpMethod;
	body?: any;
	headers?: any;
};

export const mockHttpRequest = (): HttpRequest => ({
	url: faker.internet.url(),
	method: faker.helpers.arrayElement(["get", "post", "put", "delete"]),
	body: faker.helpers.objectValue({
		name: faker.name.firstName(),
		city: faker.address.city(),
	}),
	headers: faker.helpers.objectValue({
		name: faker.name.firstName(),
		city: faker.address.city(),
	}),
});
