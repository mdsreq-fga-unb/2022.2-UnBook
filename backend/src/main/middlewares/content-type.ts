import { Request, Response, NextFunction } from "express";

const contentType = (req: Request, res: Response, next: NextFunction): void => {
  res.type("json");
  next();
};

export { contentType };
