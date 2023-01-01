import React from "react";
import { Spinner } from "../../components/login/Spinner";
import { Input } from "../../components/input/Input";
import styles from "./Login.module.css";

const Login: React.FC = () => {
	return (
		<div className={styles.login}>
			<form className={styles.form}>
				<h1 className={styles.titile}>UnBooK</h1>
				<Input type="email" name="email" placeholder="Digite seu e-mail" />
				<Input type="password" name="password" placeholder="Digite sua senha" />
				<button type="submit">Entrar</button>
				<div className={styles.separator} />
				<div className={styles.signup}>
					Não tem uma conta? <a href="">Cadastre-se</a>
				</div>
				<div className={styles.errorWrapper}>
					<Spinner className={styles.spinner} />
					<div className={styles.error}>Erro</div>
				</div>
			</form>
			<footer className={styles.footer}></footer>
		</div>
	);
};

export { Login };
