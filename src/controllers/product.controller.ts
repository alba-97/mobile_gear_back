import { Request, Response } from "express";
import { route, POST, GET, PUT, DELETE, before } from "awilix-router-core";
import ProductService from "../services/product.service";
import { handleError } from "../utils/handleError";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

@route("/products")
export default class ProductController {
  private productService: ProductService;

  constructor({ productService }: { productService: ProductService }) {
    this.productService = productService;
  }

  @route("/")
  @GET()
  async listProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.listProducts(req.query);
      res.send(products);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/discounted")
  @GET()
  async discountedProducts(req: Request, res: Response) {
    try {
      const products = await this.productService.discountedProducts();
      res.send(products);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/:id")
  @GET()
  async getProduct(req: Request, res: Response) {
    try {
      const product = await this.productService.getProduct(+req.params.id);
      res.send(product);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/")
  @POST()
  @before([validateUser, validateAdmin])
  async addProduct(req: Request, res: Response) {
    try {
      await this.productService.addProduct(req.body);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/:id")
  @PUT()
  @before([validateUser, validateAdmin])
  async editProduct(req: Request, res: Response) {
    try {
      await this.productService.editProduct(+req.params.id, req.body);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/:id")
  @DELETE()
  @before([validateUser, validateAdmin])
  async deleteProduct(req: Request, res: Response) {
    try {
      await this.productService.deleteProduct(+req.params.id);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }
}
