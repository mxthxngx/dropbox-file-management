import Joi from "joi";
export const fileValidationSchema = Joi.object({
    file: Joi.object({
      originalname: Joi.string().required(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/jpg", "application/json", "text/plain")
        .required(),
      size: Joi.number().max(10 * 1024 * 1024).required(), // Max size: 10MB
    }).unknown(true),
  });