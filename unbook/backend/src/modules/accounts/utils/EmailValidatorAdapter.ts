import { IEmailValidator } from "../presentation/controllers/SignUpProtocols";

class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): boolean {
    return false;
  }
}

export { EmailValidatorAdapter };
