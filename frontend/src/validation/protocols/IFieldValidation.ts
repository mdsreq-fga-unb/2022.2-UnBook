interface IFieldValidation {
	field: string;
	validate: (input: object) => Error;
}

export { IFieldValidation };
