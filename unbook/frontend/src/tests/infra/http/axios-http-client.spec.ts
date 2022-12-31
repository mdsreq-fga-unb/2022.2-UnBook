import { AxiosHttpClient } from "../../../infra/http/AxiosHttpClient";
import { mockAxios, mockPostRequest } from "../../mocks/";
import axios from "axios";

jest.mock("axios");

type ISutTypes = {
	sut: AxiosHttpClient;
	mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): ISutTypes => {
	const sut = new AxiosHttpClient();
	const mockedAxios = mockAxios();

	return {
		sut,
		mockedAxios,
	};
};

describe("AxiosHttpClient", () => {
	test("Deve chamar o axios com os valores corretos", async () => {
		const request = mockPostRequest();
		const { sut, mockedAxios } = makeSut();
		await sut.post(request);
		expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
	});

	test("Deve retornar o statusCode e body corretos", () => {
		const { sut, mockedAxios } = makeSut();
		const promise = sut.post(mockPostRequest());
		expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
	});
});
