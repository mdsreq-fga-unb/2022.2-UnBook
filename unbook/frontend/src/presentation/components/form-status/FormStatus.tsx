import React, { useContext } from "react";
import { Spinner } from "../index";
import styles from "./formStatus.module.css";
import { Context } from "../../contexts/form/form-context";

const FormStatus: React.FC = () => {
	const { state } = useContext(Context);
	const { isLoading, mainError } = state;
	return (
		<div data-testid="errorWrapper" className={styles.errorWrapper}>
			{isLoading && <Spinner className={styles.spinner} />}
			{mainError && <div className={styles.error}>{mainError}</div>}
		</div>
	);
};

export { FormStatus };
