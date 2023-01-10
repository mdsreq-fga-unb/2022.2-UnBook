import { faker } from "@faker-js/faker";
import "vitest-localstorage-mock";
import { LocalStorageAdapter } from "../../../src/infra/cache/LocalStorageAdapter";

describe("LocalStorageAdapter", () => {
	beforeEach(() => {
		localStorage.clear();
	});

	test("Deve chamar o localStorage com os valores corretos", async () => {
		const sut = new LocalStorageAdapter();
		const key = faker.database.column();
		const value = faker.random.word();
		await sut.set(key, value);
		expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
	});
});
