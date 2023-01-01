import React from "react";
import { Spinner } from "../";
import styles from "./FormStatus.module.css";

const FormStatus: React.FC = () => {
	return (
		<div className={styles.errorWrapper}>
			<Spinner className={styles.spinner} />
			<div className={styles.error}>Erro</div>
		</div>
	);
};

export { FormStatus };
