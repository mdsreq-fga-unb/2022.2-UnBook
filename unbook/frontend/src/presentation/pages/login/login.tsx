import React, { useState } from "react";
import { Input, FormStatus } from "../../components";
import styles from "./login.module.scss";
import { Context } from "../../contexts/form/form-context";

type StateProps = {
	isLoading: boolean;
};
type ErrorStateProps = {
	email: string;
	password: string;
	main: string;
};

const Login: React.FC = () => {
	const [state] = useState<StateProps>({
		isLoading: false,
	});
	const [errorState] = useState<ErrorStateProps>({
		email: "Campo obrigatório",
		password: "Campo obrigatório",
		main: "",
	});
	return (
		<div className={styles.login}>
			<Context.Provider value={{ state, errorState }}>
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
