import { IHttpPostClient } from "../../../../database/protocols/http/HttpPostClient";
import { RemoteAuthentication } from "../../../../database/repositories/RemoteAuthentication";

describe("RemoteAuthentication", () => {
	test("Deve chamar HttpPostClient com a URL correta", async () => {
		class HttpPostClientSpy implements IHttpPostClient {
			url?: string;
			async post(url: string): Promise<void> {
				this.url = url;
				return Promise.resolve();
			}
		}
		const url = "any_url";
		const httpPostClientSpy = new HttpPostClientSpy();
		const sut = new RemoteAuthentication(url, httpPostClientSpy);
		await sut.auth();
		expect(httpPostClientSpy.url).toBe(url);
	});
});
