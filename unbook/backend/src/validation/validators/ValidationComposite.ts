/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { IValidation } from "../protocols/IValidation";

class ValidationComposite implements IValidation {
  constructor(private readonly validations: IValidation[]) {
    this.validations = validations;
  }
  validate(input: any): Error | undefined {
    for (const validation of this.validations) {
      const error = validation.validate(input);
      if (error) {
        return error;
      }
    }
  }
}

export { ValidationComposite };
