class UnexpectedError extends Error {
	constructor() {
		super("Algo de errrado aconteceu, tente novamente mais tarde");
		this.name = "UnexpectedError";
	}
}

export { UnexpectedError };
