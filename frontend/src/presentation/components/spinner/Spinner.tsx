import React from "react";
import styles from "./spinner.module.css";

type Props = React.HTMLAttributes<HTMLElement>;

const Spinner: React.FC<Props> = (props: Props) => {
	return (
		<div
			{...props}
			data-testid="spinner"
			className={[styles.spinner].join(" ")}
		>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
};

export { Spinner };
