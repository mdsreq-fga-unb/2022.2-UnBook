import React from "react";
import styles from "./input.module.css";

type Props = React.DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const Input: React.FC<Props> = (props: Props) => {
	return <input {...props} className={[styles.input].join(" ")} />;
};

export { Input };
