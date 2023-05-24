import { Request, Response, NextFunction } from "express";
import { ApplicationError } from "../../core/shared/error/ApplicationError";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
