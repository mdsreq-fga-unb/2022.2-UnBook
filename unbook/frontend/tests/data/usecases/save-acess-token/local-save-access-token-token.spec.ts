import { LocalSaveAccessToken } from "../../../../src/data/repositories/LocalSaveAccessToken";
import { faker } from "@faker-js/faker";
import { SetStorageSpy } from "../../mocks/mock-storage";

describe("LocalSaveAccessToken", () => {
	test("Deve chamar SetStorage com os valores corretos", async () => {
		const setStorageSpy = new SetStorageSpy();
		const sut = new LocalSaveAccessToken(setStorageSpy);
		const accessToken = faker.datatype.uuid();
		await sut.save(accessToken);
		expect(setStorageSpy.key).toBe("accessToken");
		expect(setStorageSpy.value).toBe(accessToken);
	});
});
