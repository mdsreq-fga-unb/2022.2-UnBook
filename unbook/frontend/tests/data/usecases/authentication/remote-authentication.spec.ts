import { HttpStatusCode } from "../../../../src/data/protocols/http";
import { RemoteAuthentication } from "../../../../src/data/repositories/RemoteAuthentication";
import {
	InvalidCredentialsError,
	UnexpectedError,
} from "../../../../src/domain/errors";
import { IAccountModel } from "../../../../src/domain/models/IAccountModel";
import { IAuthenticationParams } from "../../../../src/domain/usecases/IAuthenticationUseCase";
import { mockAccountModel, mockAuthentication } from "../../../mocks";
import { HttpPostClientSpy } from "../../../mocks";
import { faker } from "@faker-js/faker";

interface ISubTypes {
	sut: RemoteAuthentication;
	httpPostClientSpy: HttpPostClientSpy<IAuthenticationParams, IAccountModel>;
}

const makeSut = (url = faker.internet.url()): ISubTypes => {
	const httpPostClientSpy = new HttpPostClientSpy<
		IAuthenticationParams,
		IAccountModel
	>();
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

	test("Deve lançar o erro InvalidCredencialsError se o HttpPostClient retornar 401", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.unauthorized,
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new InvalidCredentialsError());
	});

	test("Deve lançar o erro UnexpectedError se o HttpPostClient retornar 400", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.badRequest,
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	test("Deve lançar o erro UnexpectedError se o HttpPostClient retornar 500", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.serverError,
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	test("Deve lançar o erro UnexpectedError se o HttpPostClient retornar 404", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.notFound,
		};
		const promise = sut.auth(mockAuthentication());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	test("Deve retornar um AcccountModel se o HttpPostClient retornar 200", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const httpResult = mockAccountModel();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.ok,
			body: httpResult,
		};
		const account = await sut.auth(mockAuthentication());
		expect(account).toEqual(httpResult);
	});
});
