import { checkSchema } from "express-validator";

const createUserSchema = {
  username: {
    isString: true,
    notEmpty: true,
    errorMessage: "Username must be a string",
  },
  email: {
    isEmail: true,
    notEmpty: true,
    errorMessage: "Email must be a valid email",
  },
  password: {
    isString: true,
    notEmpty: true,
    errorMessage: "Password must be a string",
  },
  is_admin: {
    isBoolean: true,
    notEmpty: false,
    errorMessage: "isAdmin must be a boolean",
  },
};

export default checkSchema(createUserSchema);
