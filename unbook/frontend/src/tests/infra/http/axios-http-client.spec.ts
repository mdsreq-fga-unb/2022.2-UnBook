import { AxiosHttpClient } from "../../../infra/http/AxiosHttpClient";
import axios from "axios";
import { faker } from "@faker-js/faker";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AxiosHttpClient", () => {
	test("Deve chamar o axios com a url correta", async () => {
		const url = faker.internet.url();
		const sut = new AxiosHttpClient();
		await sut.post({ url });
		expect(mockedAxios).toHaveBeenCalledWith(url);
	});
});
