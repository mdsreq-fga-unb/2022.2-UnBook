import React, { useEffect, useState } from "react";
import { Input, FormStatus } from "../../components";
import styles from "./signup.module.scss";
import { Context } from "../../contexts/form/form-context";
import { Link } from "react-router-dom";
import { IValidation } from "../../protocols/IValidation";

type Props = {
	validation: IValidation;
};

const SignUp: React.FC<Props> = ({ validation }: Props) => {
	const [state, setState] = React.useState({
		isLoading: false,
		name: "",
		email: "",
		mainError: "",
		nameError: "",
		emailError: "",
		passwordError: "Campo obrigatório",
		passwordConfirmationError: "Campo obrigatório",
	});

	useEffect(() => {
		setState({
			...state,
			nameError: validation.validate("name", state.name),
			emailError: validation.validate("email", state.email),
		});
	}, [state.name, state.email]);

	return (
		<div className={styles.signup}>
			<Context.Provider value={{ state, setState }}>
				<form className={styles.form}>
					<h1 className={styles.titile}>Cadastra-se</h1>
					<Input
						data-testid="name"
						type="text"
						name="name"
						placeholder="Digite seu nome"
					/>
					<Input
						data-testid="email"
						type="email"
						name="email"
						placeholder="Digite seu e-mail"
					/>
					<Input
						data-testid="password"
						type="password"
						name="password"
						placeholder="Digite sua senha"
					/>
					<Input
						data-testid="password-confirmation"
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
