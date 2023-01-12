interface IValidation {
	validate(fieldName: string, input: object): string;
}

export { IValidation };
