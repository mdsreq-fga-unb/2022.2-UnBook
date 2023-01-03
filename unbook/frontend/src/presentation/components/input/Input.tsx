/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import styles from "./input.module.css";
import { Context } from "../../contexts/form/form-context";

type Props = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
	const { state, setState } = useContext(Context);
	const error = state[`${props.name}Error`];
	const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
		event.target.readOnly = false;
	};
	const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
		setState({
			...state,
			[event.target.name]: event.target.value,
		});
	};
	const getTitle = (): string => {
		return error;
	};
	return (
		<input
			{...props}
			data-testid={`${props.name}-status`}
			readOnly
			onFocus={enableInput}
			onChange={handleChange}
			className={[styles.input].join(" ")}
			title={getTitle()}
		/>
	);
};

export { Input };
