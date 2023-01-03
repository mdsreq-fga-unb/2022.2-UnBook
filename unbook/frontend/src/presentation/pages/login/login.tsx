import React, { useState, useEffect } from "react";
import { Input, FormStatus } from "../../components";
import styles from "./login.module.scss";
import { Context } from "../../contexts/form/form-context";
import { IValidation } from "../../protocols/IValidation";

type Props = {
	validation: IValidation;
};

type StateProps = {
	isLoading: boolean;
	email: string;
	password: string;
	emailError: string;
	passwordError: string;
	mainError: string;
};

const Login: React.FC<Props> = ({ validation }: Props) => {
	const [state, setState] = useState<StateProps>({
		isLoading: false,
		email: "",
		password: "",
		emailError: "Campo obrigatório",
		passwordError: "Campo obrigatório",
		mainError: "",
	});
	useEffect(() => {
		validation.validate("email", state.email);
	}, [state.email]);
	useEffect(() => {
		validation.validate("password", state.password);
	}, [state.password]);

	return (
		<div className={styles.login}>
			<Context.Provider value={{ state, setState }}>
				<form className={styles.form}>
					<h1 className={styles.titile}>UnBooK</h1>
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input
						type="password"
						name="password"
						placeholder="Digite sua senha"
					/>
					<button data-testid="submit" disabled type="submit">
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
