import { HttpStatusCode } from "../../../../database/protocols/http/HttpResponse";
import { RemoteAuthentication } from "../../../../database/repositories/RemoteAuthentication";
import { InvalidCredentialsError } from "../../../../domain/errors/InvalidCredentialsError";
import { mockAuthentication } from "../../../mocks/mock-authentication";
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
		await sut.auth(mockAuthentication());
		expect(httpPostClientSpy.url).toBe(url);
	});

	test("Deve chamar HttpPostClient com o body correto", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const authenticationParams = mockAuthentication();
		await sut.auth(authenticationParams);
		expect(httpPostClientSpy.body).toEqual(authenticationParams);
	});

	test("Deve lançar um erro de o HttpPostClient retornar 401", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.unathorized,
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});
});
