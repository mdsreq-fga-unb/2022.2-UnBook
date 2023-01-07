import { faker } from "@faker-js/faker";
import { RemoteAddAccount } from "../../../../src/data/repositories/RemoteAddAccount";
import { IAddAccountParams } from "../../../../src/domain/usecases/IAddAccountUseCase";
import { IAccountModel } from "../../../../src/domain/models/IAccountModel";
import { HttpPostClientSpy } from "../../../mocks";
import { mockAddAccountParams } from "../../mocks/mock-add-account";
import { HttpStatusCode } from "../../../../src/data/protocols/http";
import { EmailInUseError } from "../../../../src/domain/errors/EmailInUseError";
import { UnexpectedError } from "../../../../src/domain/errors";

interface ISubTypes {
	sut: RemoteAddAccount;
	httpPostClientSpy: HttpPostClientSpy<IAddAccountParams, IAccountModel>;
}

const makeSut = (url = faker.internet.url()): ISubTypes => {
	const httpPostClientSpy = new HttpPostClientSpy<
		IAddAccountParams,
		IAccountModel
	>();
	const sut = new RemoteAddAccount(url, httpPostClientSpy);

	return {
		sut,
		httpPostClientSpy,
	};
};

describe("RemoteAuthentication", () => {
	test("Deve chamar HttpPostClient com a URL correta", async () => {
		const url = faker.internet.url();
		const { sut, httpPostClientSpy } = makeSut(url);
		await sut.add(mockAddAccountParams());
		expect(httpPostClientSpy.url).toBe(url);
	});

	test("Deve chamar HttpPostClient com o body correto", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		const addAccountParams = mockAddAccountParams();
		await sut.add(addAccountParams);
		expect(httpPostClientSpy.body).toEqual(addAccountParams);
	});

	test("Deve lançar o erro EmailInUseError se o HttpPostClient retornar 403", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.forbidden,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new EmailInUseError());
	});

	test("Deve lançar o erro UnexpectedError se o HttpPostClient retornar 400", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.badRequest,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	test("Deve lançar o erro UnexpectedError se o HttpPostClient retornar 500", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.serverError,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});

	test("Deve lançar o erro UnexpectedError se o HttpPostClient retornar 404", async () => {
		const { sut, httpPostClientSpy } = makeSut();
		httpPostClientSpy.response = {
			statusCode: HttpStatusCode.notFound,
		};
		const promise = sut.add(mockAddAccountParams());
		await expect(promise).rejects.toThrow(new UnexpectedError());
	});
});
