import { IHttpResponse } from "../protocols/http";

const badRequest = (error: Error): IHttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export { badRequest };
