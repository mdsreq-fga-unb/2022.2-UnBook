import React, { useEffect, useState } from "react";
import { Input, FormStatus } from "../../components";
import styles from "./signup.module.scss";
import { Context } from "../../contexts/form/form-context";
import { Link, useNavigate } from "react-router-dom";
import { IValidation } from "../../protocols/IValidation";
import { IAddAccount } from "../../../domain/usecases/IAddAccountUseCase";
import { ISaveAccessToken } from "../../../domain/usecases/ISaveAccessTokenUseCase";

type Props = {
	validation: IValidation;
	addAccount: IAddAccount;
	saveAccessToken: ISaveAccessToken;
};

type StateProps = {
	isLoading: boolean;
	isFormInvalid: boolean;
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
	nameError: string;
	emailError: string;
	passwordError: string;
	passwordConfirmationError: string;
	mainError: string;
};

const SignUp: React.FC<Props> = ({
	validation,
	addAccount,
	saveAccessToken,
}: Props) => {
	const navigate = useNavigate();
	const [state, setState] = useState<StateProps>({
		isLoading: false,
		isFormInvalid: true,
		name: "",
		email: "",
		password: "",
		passwordConfirmation: "",
		nameError: "",
		emailError: "",
		passwordError: "",
		passwordConfirmationError: "",
		mainError: "",
	});

	useEffect(() => {
		const nameError = validation.validate("name", state.name);
		const emailError = validation.validate("email", state.email);
		const passwordError = validation.validate("password", state.password);
		const passwordConfirmationError = validation.validate(
			"passwordConfirmation",
			state.passwordConfirmation
		);
		setState({
			...state,
			nameError,
			emailError,
			passwordError,
			passwordConfirmationError,
			isFormInvalid:
				!!emailError ||
				!!passwordError ||
				!!nameError ||
				!!passwordConfirmationError,
		});
	}, [state.name, state.email, state.password, state.passwordConfirmation]);

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		try {
			if (state.isLoading || state.isFormInvalid) {
				return;
			}
			event.preventDefault();
			setState({ ...state, isLoading: true });
			const account = await addAccount.add({
				name: state.name,
				email: state.email,
				password: state.password,
				passwordConfirmation: state.passwordConfirmation,
			});
			await saveAccessToken.save(account.accessToken);
			navigate("/");
		} catch (error) {
			setState({
				...state,
				isLoading: false,
				mainError: error.message,
			});
		}
	};

	return (
		<div className={styles.signup}>
			<Context.Provider value={{ state, setState }}>
				<form
					data-testid="form"
					onSubmit={handleSubmit}
					className={styles.form}
				>
					<h1 className={styles.titile}>Cadastra-se</h1>
					<Input type="text" name="name" placeholder="Digite seu nome" />
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input
						type="password"
						name="password"
						placeholder="Digite sua senha"
					/>
					<Input
						type="password"
						name="passwordConfirmation"
						placeholder="Repita sua senha"
					/>
					<button
						data-testid="submit"
						disabled={state.isFormInvalid}
						type="submit"
					>
						Cadastrar
					</button>
					<div className={styles.separator} />
					<div className={styles.login}>
						Já possui uma conta?
						<Link data-testid="login" to="/login">
							Entrar
						</Link>
					</div>
					<FormStatus />
				</form>
			</Context.Provider>
			<footer className={styles.footer}></footer>
		</div>
	);
};

export { SignUp };
