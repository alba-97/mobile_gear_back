import { Request, Response } from "express";
import { route, POST, GET, PUT, DELETE, before } from "awilix-router-core";
import CategoryService from "../services/category.service";
import { handleError } from "../utils/handleError";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

@route("/categories")
export default class CategoryController {
  private categoryService: CategoryService;

  constructor({ categoryService }: { categoryService: CategoryService }) {
    this.categoryService = categoryService;
  }

  @route("/")
  @GET()
  async listCategories(_: Request, res: Response) {
    try {
      const categories = await this.categoryService.listCategories();
      res.send(categories);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/")
  @POST()
  @before([validateUser, validateAdmin])
  async addCategory(req: Request, res: Response) {
    try {
      const name = req.body.name.toLowerCase();
      await this.categoryService.addCategory(name);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/:id")
  @PUT()
  @before([validateUser, validateAdmin])
  async editCategory(req: Request, res: Response) {
    try {
      const name = req.body.name;
      await this.categoryService.editCategory(+req.params.id, name);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/:id")
  @DELETE()
  @before([validateUser, validateAdmin])
  async deleteCategory(req: Request, res: Response) {
    try {
      await this.categoryService.deleteCategory(+req.params.id);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }
}
