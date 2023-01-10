/* eslint-disable @typescript-eslint/no-unused-vars */
import { ISaveAccessToken } from "../../../../src/domain/usecases/ISaveAccessTokenUseCase";
import { IValidation } from "../../../../src/presentation/protocols/IValidation";

class SaveAccessTokenMock implements ISaveAccessToken {
	accessToken: string;

	async save(accessToken: string): Promise<void> {
		this.accessToken = accessToken;
	}
}

export { SaveAccessTokenMock };
