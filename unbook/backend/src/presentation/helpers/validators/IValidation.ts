/* eslint-disable @typescript-eslint/no-explicit-any */
interface IValidation {
  validate(input: any): Promise<Error | null>;
}

export { IValidation };
