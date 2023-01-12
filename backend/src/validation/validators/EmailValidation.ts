/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { InvalidParamError } from "../../presentation/errors";
import { IEmailValidator } from "../protocols/IEmailValidator";
import { IValidation } from "../protocols/IValidation";

class EmailValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: IEmailValidator
  ) {
    this.fieldName = fieldName;
    this.emailValidator = emailValidator;
  }
  validate(input: any): Error | undefined {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}

export { EmailValidation };
