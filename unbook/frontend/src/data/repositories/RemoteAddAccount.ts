/* eslint-disable @typescript-eslint/no-unused-vars */
import { UnexpectedError } from "../../domain/errors";
import { EmailInUseError } from "../../domain/errors/EmailInUseError";
import { IAccountModel } from "../../domain/models/IAccountModel";
import {
	IAddAccount,
	IAddAccountParams,
} from "../../domain/usecases/IAddAccountUseCase";
import { HttpStatusCode, IHttpPostClient } from "../protocols/http";

class RemoteAddAccount implements IAddAccount {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: IHttpPostClient<
			IAddAccountParams,
			IAccountModel
		>
	) {}
	async add(params: IAddAccountParams): Promise<IAccountModel> {
		const httpResponse = await this.httpPostClient.post({
			url: this.url,
			body: params,
		});

		switch (httpResponse.statusCode) {
		case HttpStatusCode.ok:
			return null;
		case HttpStatusCode.forbidden:
			throw new EmailInUseError();
		default:
			throw new UnexpectedError();
		}
	}
}

export { RemoteAddAccount };
