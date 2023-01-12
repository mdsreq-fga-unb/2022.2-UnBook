class EmailInUseError extends Error {
  constructor() {
    super("Esse email já está em uso");
    this.name = "InvalidParamError";
  }
}

export { EmailInUseError };
