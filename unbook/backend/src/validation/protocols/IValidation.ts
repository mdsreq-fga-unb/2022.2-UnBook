/* eslint-disable @typescript-eslint/no-explicit-any */
interface IValidation {
  validate(input: any): Error | undefined;
}

export { IValidation };
