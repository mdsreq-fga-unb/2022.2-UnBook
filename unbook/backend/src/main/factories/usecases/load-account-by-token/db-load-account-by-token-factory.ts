import { LoadAccountByTokenRepository } from "../../../../data/repositories/LoadAccountByTokenRepository";
import { ILoadAccountByToken } from "../../../../domain/usecases/ILoadAccountByTokenUseCase";
import { JWTAdapter } from "../../../../infra/criptography/JWTAdapter";
import { AccountMongoRepository } from "../../../../infra/database/mongodb/repositories/account/AccountMongoRepository";

const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JWTAdapter(process.env.JWT_SECRET as string);
  const accountMongoRepository = new AccountMongoRepository();
  return new LoadAccountByTokenRepository(jwtAdapter, accountMongoRepository);
};
export { makeDbLoadAccountByToken };
