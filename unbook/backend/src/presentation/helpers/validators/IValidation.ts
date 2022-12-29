/* eslint-disable @typescript-eslint/no-explicit-any */
interface IValidation {
  validate(input: any): Error | null;
}

export { IValidation };
