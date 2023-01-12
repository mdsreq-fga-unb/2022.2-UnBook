import React from "react";
import { Login } from "../../../../presentation/pages/login/login";
import { RemoteAuthentication } from "../../../../data/repositories/RemoteAuthentication";
import { AxiosHttpClient } from "../../../../infra/http/AxiosHttpClient";
import { ValidationComposite } from "../../../../validation/validators/validation-composite/ValidationComposite";
import { ValidationBuilder } from "../../../../validation/validators/builder/ValidationBuilder";
import { makeUrl } from "./makeUrl-factory";
import { LocalSaveAccessToken } from "../../../../data/repositories/LocalSaveAccessToken";
import { LocalStorageAdapter } from "../../../../infra/cache/LocalStorageAdapter";

const makeLogin = (): JSX.Element => {
	const url = makeUrl("login");
	const axiosHttpClient = new AxiosHttpClient();
	const remoteAuthentication = new RemoteAuthentication(url, axiosHttpClient);
	const validationComposite = ValidationComposite.build([
		...ValidationBuilder.field("email").required().email().build(),
		...ValidationBuilder.field("password").required().min(8).build(),
	]);
	const localStorageAdapter = new LocalStorageAdapter();
	const localSaveAccessToken = new LocalSaveAccessToken(localStorageAdapter);
	return (
		<Login
			validation={validationComposite}
			authentication={remoteAuthentication}
			saveAccessToken={localSaveAccessToken}
		/>
	);
};

export { makeLogin };
