import { IAccountModel } from "../../domain/models/AccountModel";
import {
  IAddAccount,
  IAddAccountModel,
} from "../../domain/usecases/IAddAccountUseCase";
import { IController, IHttpRequest, IHttpResponse } from "../protocols";
import { IEmailValidator } from "../protocols/email-validator";

export {
  IAccountModel,
  IAddAccount,
  IAddAccountModel,
  IController,
  IHttpRequest,
  IHttpResponse,
  IEmailValidator,
};
