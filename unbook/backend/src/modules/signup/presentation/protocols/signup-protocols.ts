import { IController, IHttpRequest, IHttpResponse } from ".";
import { IAccountModel } from "../../domain/models/AccountModel";
import {
  IAddAccount,
  IAddAccountModel,
} from "../../domain/usecases/IAddAccountUseCase";
import { IEmailValidator } from "./email-validator";

export {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IController,
  IHttpRequest,
  IHttpResponse,
  IEmailValidator,
};
