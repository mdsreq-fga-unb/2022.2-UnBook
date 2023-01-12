/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable consistent-return */
import { InvalidParamError } from "../../presentation/errors";
import { IValidation } from "../protocols/IValidation";

class CompareFieldsValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompare: string
  ) {
    this.fieldName = fieldName;
    this.fieldToCompare = fieldToCompare;
  }
  validate(input: any): Error | undefined {
    if (input[this.fieldName] !== input[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare);
    }
  }
}

export { CompareFieldsValidation };
