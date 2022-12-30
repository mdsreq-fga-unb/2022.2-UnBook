import { IAccountModel } from "../../../domain/models/AccountModel";
import {
  IAuthentication,
  IAuthenticationModel,
} from "../../../domain/usecases/IAuthenticationUseCase";
import { ILoadAccountByEmailRepository } from "../database/ILoadAccountByEmailRepository";
import { IUpdateAccessTokenRepository } from "../database/IUpdateAcessTokenRepository";
import { IHashComparer } from "./IHashComparer";
import { ITokenGenerator } from "./ITokenGenerator";

export {
  IAccountModel,
  IAuthentication,
  IAuthenticationModel,
  ILoadAccountByEmailRepository,
  IUpdateAccessTokenRepository,
  IHashComparer,
  ITokenGenerator,
};
