class MissingParamError extends Error {
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = `MissingParamError: ${paramName}`;
  }
}

export { MissingParamError };
