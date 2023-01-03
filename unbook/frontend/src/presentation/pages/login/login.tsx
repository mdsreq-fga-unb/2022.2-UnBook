import React, { useState } from "react";
import { Input, FormStatus } from "../../components";
import styles from "./login.module.css";
import { Context } from "../../contexts/form/form-context";

type StateProps = {
	isLoading: boolean;
	errorMessage: string;
};

const Login: React.FC = () => {
	const [state] = useState({
		isLoading: false,
		errorMessage: "",
	});
	return (
		<div className={styles.login}>
			<Context.Provider value={state}>
				<form className={styles.form}>
					<h1 className={styles.titile}>UnBooK</h1>
					<Input type="email" name="email" placeholder="Digite seu e-mail" />
					<Input
						type="password"
						name="password"
						placeholder="Digite sua senha"
					/>
					<button type="submit">Entrar</button>
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
