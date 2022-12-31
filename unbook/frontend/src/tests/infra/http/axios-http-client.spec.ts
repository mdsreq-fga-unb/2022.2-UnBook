import { AxiosHttpClient } from "../../../infra/http/AxiosHttpClient";
import axios from "axios";
import { faker } from "@faker-js/faker";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const makeSut = (): AxiosHttpClient => {
	return new AxiosHttpClient();
};

describe("AxiosHttpClient", () => {
	test("Deve chamar o axios com a url e verbo corretos", async () => {
		const url = faker.internet.url();
		const sut = makeSut();
		await sut.post({ url });
		expect(mockedAxios.post).toHaveBeenCalledWith(url);
	});
});
