import { AuthenticationRepository } from "../../../../data/repositories/AuthenticationRepository";
import { IAuthentication } from "../../../../domain/usecases/IAuthenticationUseCase";
import { BcryptAdapter } from "../../../../infra/criptography/BcryptAdapter";
import { JWTAdapter } from "../../../../infra/criptography/JWTAdapter";
import { AccountMongoRepository } from "../../../../infra/database/mongodb/repositories/account/AccountMongoRepository";
import env from "../../../config/env";

const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdpter = new JWTAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new AuthenticationRepository(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdpter,
    accountMongoRepository
  );
};
export { makeDbAuthentication };
