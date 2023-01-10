import React from "react";
import { AxiosHttpClient } from "../../../../infra/http/AxiosHttpClient";
import { ValidationComposite } from "../../../../validation/validators/validation-composite/ValidationComposite";
import { ValidationBuilder } from "../../../../validation/validators/builder/ValidationBuilder";
import { LocalSaveAccessToken } from "../../../../data/repositories/LocalSaveAccessToken";
import { LocalStorageAdapter } from "../../../../infra/cache/LocalStorageAdapter";
import { SignUp } from "../../../../presentation/pages/signup/signup";
import { RemoteAddAccount } from "../../../../data/repositories/RemoteAddAccount";
import { makeUrl } from "../login/makeUrl-factory";

const makeSignUp = (): JSX.Element => {
	const url = makeUrl("signup");
	const axiosHttpClient = new AxiosHttpClient();
	const remoteAddAccount = new RemoteAddAccount(url, axiosHttpClient);
	const validationComposite = ValidationComposite.build([
		...ValidationBuilder.field("name").required().min(8).build(),
		...ValidationBuilder.field("email").required().email().build(),
		...ValidationBuilder.field("password").required().min(8).build(),
		...ValidationBuilder.field("passwordConfirmation")
			.required()
			.min(8)
			.build(),
	]);
	const localStorageAdapter = new LocalStorageAdapter();
	const localSaveAccessToken = new LocalSaveAccessToken(localStorageAdapter);
	return (
		<SignUp
			validation={validationComposite}
			addAccount={remoteAddAccount}
			saveAccessToken={localSaveAccessToken}
		/>
	);
};

export { makeSignUp };
