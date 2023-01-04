import React, { useState, useEffect } from "react";
import { Input, FormStatus } from "../../components";
import styles from "./login.module.scss";
import { Context } from "../../contexts/form/form-context";
import { IValidation } from "../../protocols/IValidation";
import { IAuthentication } from "../../../domain/usecases/IAuthenticationUseCase";

type Props = {
	validation: IValidation;
	authentication: IAuthentication;
};

type StateProps = {
	isLoading: boolean;
	email: string;
	password: string;
	emailError: string;
	passwordError: string;
	mainError: string;
};

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
	const [state, setState] = useState<StateProps>({
		isLoading: false,
		email: "",
		password: "",
		emailError: "",
		passwordError: "",
		mainError: "",
	});

	useEffect(() => {
		setState({
			...state,
			emailError: validation.validate("email", state.email),
			passwordError: validation.validate("password", state.password),
		});
	}, [state.email, state.password]);

	const handleSubmit = async (
		event: React.FormEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		try {
			if (state.isLoading || state.emailError || state.passwordError) {
				return;
			}
			setState({ ...state, isLoading: true });
			await authentication.auth({
				email: state.email,
				password: state.password,
			});
		} catch (error) {
			setState({
				...state,
				isLoading: false,
				mainError: error.message,
			});
		}
	};

	return (
		<div className={styles.login}>
			<Context.Provider value={{ state, setState }}>
				<form
					data-testid="form"
					className={styles.form}
					onSubmit={handleSubmit}
				>
					<h1 className={styles.titile}>UnBooK</h1>
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input
						type="password"
						name="password"
						placeholder="Digite sua senha"
					/>
					<button
						data-testid="submit"
						disabled={!!state.emailError || !!state.passwordError}
						type="submit"
					>
						Entrar
					</button>
					<div className={styles.separator} />
					<div className={styles.signup}>
						Não tem uma conta? <a href="">Cadastre-se</a>
					</div>
					<FormStatus />
				</form>
			</Context.Provider>
			<footer className={styles.footer}></footer>
		</div>
	);
};

export { Login };
