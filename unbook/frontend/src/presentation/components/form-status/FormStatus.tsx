import React, { useContext } from "react";
import { Spinner } from "../index";
import styles from "./formStatus.module.css";
import { Context } from "../../contexts/form/form-context";

const FormStatus: React.FC = () => {
	const { isLoading, errorMessage } = useContext(Context);
	return (
		<div data-testid="errorWrapper" className={styles.errorWrapper}>
			{isLoading && <Spinner className={styles.spinner} />}
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
		</div>
	);
};

export { FormStatus };
