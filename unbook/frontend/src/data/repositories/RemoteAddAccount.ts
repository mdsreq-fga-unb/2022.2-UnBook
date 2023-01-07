/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAccountModel } from "../../domain/models/IAccountModel";
import {
	IAddAccount,
	IAddAccountParams,
} from "../../domain/usecases/IAddAccountUseCase";
import { IHttpPostClient } from "../protocols/http";

class RemoteAddAccount implements IAddAccount {
	constructor(
		private readonly url: string,
		private readonly httpPostClient: IHttpPostClient<
			IAddAccountParams,
			IAccountModel
		>
	) {}
	async add(params: IAddAccountParams): Promise<IAccountModel> {
		await this.httpPostClient.post({
			url: this.url,
			body: params,
		});
		return new Promise((resolve) => resolve(null));
	}
}

export { RemoteAddAccount };
