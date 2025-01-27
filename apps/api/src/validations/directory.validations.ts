import Joi from "joi";

export const directoryValidationSchema = Joi.object({
  name: Joi.string().min(1).required(),
  directoryPath: Joi.string().optional().allow(""), 
});