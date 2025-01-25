import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema } from "joi";
import ApiError from "../utils/ApiError"; 
import httpStatus from "../models/http-status.model";

const validate = (schema: ObjectSchema) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { value, error } = schema.validate(req.body);  

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
        return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

export default validate;