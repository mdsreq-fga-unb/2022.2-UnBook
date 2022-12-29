/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { IValidation } from "./IValidation";

class RequiredFieldValidation implements IValidation {
  constructor(private readonly fieldName: string) {
    this.fieldName = fieldName;
  }
  validate(input: any): Error | undefined {
    for (const field of this.fieldName) {
      if (!input[field]) {
        return new Error(`Missing param: ${field}`);
      }
    }
  }
}

export { RequiredFieldValidation };
