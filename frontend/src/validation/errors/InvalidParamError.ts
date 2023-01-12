class InvalidParamError extends Error {
	constructor(paramName: string) {
		super(`${paramName} inválido`);
	}
}

export { InvalidParamError };
