import { checkSchema } from "express-validator";

const editUserSchema = {
  username: {
    isString: true,
    notEmpty: false,
    errorMessage: "Username must be a string",
  },
  email: {
    isEmail: true,
    notEmpty: false,
    errorMessage: "Email must be a valid email",
  },
  password: {
    isString: true,
    notEmpty: false,
    errorMessage: "Password must be a string",
  },
  is_admin: {
    isBoolean: true,
    notEmpty: false,
    errorMessage: "isAdmin must be a boolean",
  },
  checkoutId: {
    isInt: true,
    notEmpty: false,
    errorMessage: "CheckoutId must be an integer",
  },
};

export default checkSchema(editUserSchema);
