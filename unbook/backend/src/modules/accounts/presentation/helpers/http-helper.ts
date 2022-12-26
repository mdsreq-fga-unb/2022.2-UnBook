import { ServerError } from "../errors/server-errors";
import { IHttpResponse } from "../protocols/http";

const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

const serverError = (): IHttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(),
  };
};

export { badRequest, serverError };
