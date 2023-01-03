import React, { useContext } from "react";
import { Spinner } from "../index";
import styles from "./formStatus.module.css";
import { Context } from "../../contexts/form/form-context";

const FormStatus: React.FC = () => {
	const { state, errorState } = useContext(Context);
	const { isLoading } = state;
	return (
		<div data-testid="errorWrapper" className={styles.errorWrapper}>
			{isLoading && <Spinner className={styles.spinner} />}
			{errorState.main && <div className={styles.error}>{errorState.main}</div>}
		</div>
	);
};

export { FormStatus };
