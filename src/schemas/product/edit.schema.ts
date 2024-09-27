import { checkSchema } from "express-validator";

const editProductSchema = {
  name: {
    isString: true,
    notEmpty: false,
    errorMessage: "Name must be a string",
  },
  price: {
    isFloat: { options: { gt: 0 } },
    notEmpty: false,
    errorMessage: "Price must be a positive number",
  },
  description: {
    isString: true,
    notEmpty: false,
    errorMessage: "Description must be a string",
  },
  brand: {
    isInt: true,
    notEmpty: false,
    errorMessage: "Brand must be an integer",
  },
  category: {
    isInt: true,
    notEmpty: false,
    errorMessage: "Category must be an integer",
  },
  product_img: {
    isURL: true,
    notEmpty: false,
    errorMessage: "Product image must be a valid URL",
  },
  stock: {
    isInt: { options: { min: 0 } },
    notEmpty: false,
    errorMessage: "Stock must be a positive integer",
  },
  discount: {
    isInt: { options: { min: 0, max: 100 } },
    notEmpty: false,
    errorMessage: "Discount must be a number between 0 and 100",
  },
};

export default checkSchema(editProductSchema);
