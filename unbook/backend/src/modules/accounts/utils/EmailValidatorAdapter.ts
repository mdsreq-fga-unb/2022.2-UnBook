import validator from "validator";
import { IEmailValidator } from "../presentation/controllers/SignUpProtocols";

class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return validator.isEmail(email) && email.includes("@aluno.unb.br");
  }
}

export { EmailValidatorAdapter };
