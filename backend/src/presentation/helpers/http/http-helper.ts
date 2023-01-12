import { ServerError, UnauthorizedError } from "../../errors";
import { IHttpResponse } from "../../protocols/IHttp";

const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

const forbidden = (error: Error): IHttpResponse => {
  return {
    statusCode: 403,
    body: error,
  };
};

const serverError = (error: Error): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack as string),
  };
};

const ok = (data: unknown): IHttpResponse => {
  return {
    statusCode: 200,
    body: data,
  };
};

const noContent = (): IHttpResponse => {
  return {
    statusCode: 204,
    body: null,
  };
};

const unauthorized = (): IHttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
};

export { badRequest, forbidden, serverError, ok, unauthorized, noContent };
