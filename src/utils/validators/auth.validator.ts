import { check } from "express-validator";
import { validatorHandler } from "../middlewares";

export const authLoginValidator = [
  check('username').exists().notEmpty().isEmail(),
  check('password').exists().notEmpty(),
  validatorHandler,
];
