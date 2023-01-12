import { LocalSaveAccessToken } from "../../../../src/data/repositories/LocalSaveAccessToken";
import { faker } from "@faker-js/faker";
import { SetStorageMock } from "../../mocks/mock-storage";
import { vi } from "vitest";

type SutTypes = {
	sut: LocalSaveAccessToken;
	setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
	const setStorageMock = new SetStorageMock();
	const sut = new LocalSaveAccessToken(setStorageMock);
	return {
		sut,
		setStorageMock,
	};
};

describe("LocalSaveAccessToken", () => {
	test("Deve chamar SetStorage com os valores corretos", async () => {
		const { sut, setStorageMock } = makeSut();
		const accessToken = faker.datatype.uuid();
		await sut.save(accessToken);
		expect(setStorageMock.key).toBe("accessToken");
		expect(setStorageMock.value).toBe(accessToken);
	});

	test("Deve lançar um erro se o SetStorage lançar um erro", async () => {
		const { sut, setStorageMock } = makeSut();
		vi.spyOn(setStorageMock, "set").mockReturnValueOnce(
			Promise.reject(new Error())
		);
		const promise = sut.save(faker.datatype.uuid());
		await expect(promise).rejects.toThrow(new Error());
	});
});
