import { ISaveAccessToken } from "../../domain/usecases/ISaveAccessTokenUseCase";
import { ISetStorage } from "../protocols/cache/SetStorage";

class LocalSaveAccessToken implements ISaveAccessToken {
	constructor(private readonly setStorage: ISetStorage) {}
	async save(accessToken: string): Promise<void> {
		await this.setStorage.set("accessToken", accessToken);
	}
}

export { LocalSaveAccessToken };
