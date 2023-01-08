import React, { useState } from "react";
import { Input, FormStatus } from "../../components";
import styles from "./signup.module.scss";
import { Context } from "../../contexts/form/form-context";
import { Link } from "react-router-dom";

const SignUp: React.FC = () => {
	const [state] = React.useState({
		isLoading: false,
		mainError: "",
		nameError: "Campo obrigatório",
		emailError: "Campo obrigatório",
		passwordError: "Campo obrigatório",
		passwordConfirmationError: "Campo obrigatório",
	});

	return (
		<div className={styles.signup}>
			<Context.Provider value={{ state }}>
				<form className={styles.form}>
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
						name="password"
						placeholder="Repita sua senha"
					/>
					<button data-testid="submit" disabled type="submit">
						Cadastrar
					</button>
					<div className={styles.separator} />
					<div className={styles.login}>
						Já possui uma conta?
						<Link to="/login">Entrar</Link>
					</div>
					<FormStatus />
				</form>
			</Context.Provider>
			<footer className={styles.footer}></footer>
		</div>
	);
};

export { SignUp };
