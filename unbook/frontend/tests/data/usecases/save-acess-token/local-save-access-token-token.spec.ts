import { LocalSaveAccessToken } from "../../../../src/data/repositories/LocalSaveAccessToken";
import { faker } from "@faker-js/faker";
import { SetStorageMock } from "../../mocks/mock-storage";

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

	test("Deve chamar SetStorage com os valores corretos", async () => {
		const { sut, setStorageMock } = makeSut();
		const accessToken = faker.datatype.uuid();
		await sut.save(accessToken);
		expect(setStorageMock.key).toBe("accessToken");
		expect(setStorageMock.value).toBe(accessToken);
	});
});
