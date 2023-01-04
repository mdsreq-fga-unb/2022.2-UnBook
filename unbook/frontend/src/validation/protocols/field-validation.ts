interface IFielValidation {
	field: string;
	validate: (value: string) => Error;
}

export { IFielValidation };
