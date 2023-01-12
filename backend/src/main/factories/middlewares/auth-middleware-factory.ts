import { AuthMiddleware } from "../../../presentation/middlewares/AuthMiddleware";
import { IMiddleware } from "../../../presentation/protocols/IMiddleware";
import { makeDbLoadAccountByToken } from "../usecases/load-account-by-token/db-load-account-by-token-factory";

const makeAuthMiddleware = (): IMiddleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken());
};
export { makeAuthMiddleware };
