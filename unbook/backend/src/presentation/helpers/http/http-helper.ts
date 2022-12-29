import { ServerError, UnauthorizedError } from "../../errors";
import { IHttpResponse } from "../../protocols/IHttp";

const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
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

const unauthorized = (): IHttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
};

export { badRequest, serverError, ok, unauthorized };
