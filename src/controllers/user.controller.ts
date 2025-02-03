import { Request, Response } from "express";
import { route, POST, GET, PUT, DELETE, before } from "awilix-router-core";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import { handleError } from "../utils/handleError";
import validateUser from "../middleware/validateUser";
import validateAdmin from "../middleware/validateAdmin";

@route("/users")
export default class UserController {
  private userService: UserService;
  private authService: AuthService;

  constructor({
    userService,
    authService,
  }: {
    userService: UserService;
    authService: AuthService;
  }) {
    this.userService = userService;
    this.authService = authService;
  }

  @route("/signup")
  @POST()
  async signup(req: Request, res: Response) {
    try {
      await this.userService.createUser(req.body);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/login")
  @POST()
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password);
      res.send(result);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/me")
  @GET()
  @before([validateUser])
  async me(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.user.id);
      res.send(user);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/")
  @GET()
  @before([validateUser, validateAdmin])
  async listUsers(_: Request, res: Response) {
    try {
      const users = await this.userService.listUsers();
      res.send(users);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/:id")
  @PUT()
  @before([validateUser, validateAdmin])
  async switchPrivileges(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.switchPrivileges(+id);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }

  @route("/:id")
  @DELETE()
  @before([validateUser, validateAdmin])
  async removeUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await this.userService.removeUser(+id);
      res.sendStatus(200);
    } catch (err) {
      return handleError(res, err);
    }
  }
}
