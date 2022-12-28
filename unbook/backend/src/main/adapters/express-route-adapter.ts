import { Request, Response } from "express";
import { IController, IHttpRequest } from "../../presentation/protocols";

const adaptRoute = (controller: IController) => {
  return async (request: Request, response: Response): Promise<void> => {
    const httpRequest: IHttpRequest = {
      body: request.body,
    };
    const httpResponse = await controller.handle(httpRequest);
    response.status(httpResponse.statusCode).json(httpResponse.body);
  };
};

export { adaptRoute };
