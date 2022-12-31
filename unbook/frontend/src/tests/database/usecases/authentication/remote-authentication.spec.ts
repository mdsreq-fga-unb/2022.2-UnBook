import { RemoteAuthentication } from "../../../../database/repositories/RemoteAuthentication";
import { HttpPostClientSpy } from "../../../mocks/mock-http-client";

describe("RemoteAuthentication", () => {
	test("Deve chamar HttpPostClient com a URL correta", async () => {
		const url = "any_url";
		const httpPostClientSpy = new HttpPostClientSpy();
		const sut = new RemoteAuthentication(url, httpPostClientSpy);
		await sut.auth();
		expect(httpPostClientSpy.url).toBe(url);
	});
});
