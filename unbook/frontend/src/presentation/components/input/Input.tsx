/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import styles from "./input.module.css";
import { Context } from "../../contexts/form/form-context";

type Props = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
	const { errorState } = useContext(Context);
	const error = errorState[props.name];
	const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
		event.target.readOnly = false;
	};
	const getTitle = (): string => {
		return error;
	};
	return (
		<input
			data-testid={`${props.name}-status`}
			{...props}
			readOnly
			onFocus={enableInput}
			className={[styles.input].join(" ")}
			title={getTitle()}
		/>
	);
};

export { Input };
