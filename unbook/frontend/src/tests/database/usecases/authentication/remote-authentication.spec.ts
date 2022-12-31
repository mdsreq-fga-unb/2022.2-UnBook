import { RemoteAuthentication } from "../../../../database/repositories/RemoteAuthentication";
import { HttpPostClientSpy } from "../../../mocks/mock-http-client";
import { faker } from "@faker-js/faker";

interface ISubTypes {
	sut: RemoteAuthentication;
	httpPostClientSpy: HttpPostClientSpy;
}

const makeSut = (url = faker.internet.url()): ISubTypes => {
	const httpPostClientSpy = new HttpPostClientSpy();
	const sut = new RemoteAuthentication(url, httpPostClientSpy);

	return {
		sut,
		httpPostClientSpy,
	};
};

describe("RemoteAuthentication", () => {
	test("Deve chamar HttpPostClient com a URL correta", async () => {
		const url = faker.internet.url();
		const { sut, httpPostClientSpy } = makeSut(url);
		await sut.auth();
		expect(httpPostClientSpy.url).toBe(url);
	});
});
