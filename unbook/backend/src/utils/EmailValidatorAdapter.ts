import validator from "validator";
import { IEmailValidator } from "../presentation/protocols/signup-protocols";

class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email) && email.endsWith("@aluno.unb.br");
  }
}

export { EmailValidatorAdapter };
