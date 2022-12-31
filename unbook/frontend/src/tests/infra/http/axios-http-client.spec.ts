import { AxiosHttpClient } from "../../../infra/http/AxiosHttpClient";
import axios from "axios";
import { faker } from "@faker-js/faker";
import { HttpPostParams } from "../../../database/protocols/http";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
	return new AxiosHttpClient();
};

const mockPostRequest = (): HttpPostParams<any> => ({
	url: faker.internet.url(),
	body: faker.helpers.objectValue({}),
});

describe("AxiosHttpClient", () => {
	test("Deve chamar o axios com a url e verbo corretos", async () => {
		const request = mockPostRequest();
		const sut = makeSut();
		await sut.post(request);
		expect(mockedAxios.post).toHaveBeenCalledWith(request.url);
	});
});
