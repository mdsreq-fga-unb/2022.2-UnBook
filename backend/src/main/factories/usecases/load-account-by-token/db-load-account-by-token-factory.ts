import { LoadAccountByTokenRepository } from "../../../../data/repositories/LoadAccountByTokenRepository";
import { ILoadAccountByToken } from "../../../../domain/usecases/ILoadAccountByTokenUseCase";
import { JWTAdapter } from "../../../../infra/criptography/JWTAdapter";
import { AccountMongoRepository } from "../../../../infra/database/mongodb/repositories/account/AccountMongoRepository";
import env from "../../../config/env";

const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JWTAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new LoadAccountByTokenRepository(jwtAdapter, accountMongoRepository);
};
export { makeDbLoadAccountByToken };
