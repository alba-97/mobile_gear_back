import { CreationAttributes } from "sequelize";
import UserRepository from "../repositories/user.repository";
import { User } from "../models";
import { HttpError } from "../utils/httpError";

export default class UserService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreationAttributes<User>) {
    return await this.userRepository.createOne(data);
  }

  async getUserById(id: number) {
    const user = await this.userRepository.getOneById(id);
    if (!user) throw new HttpError(404, "User not found");
    return user;
  }

  async listUsers() {
    return await this.userRepository.getAll();
  }

  async switchPrivileges(id: number) {
    const user = await this.userRepository.getOneById(id);
    if (!user) throw new HttpError(404, "User not found");

    const { isAdmin, ...rest } = user;

    return await this.userRepository.updateOneById(id, {
      ...rest,
      isAdmin: !isAdmin,
    });
  }

  async updateUser(id: number, data: CreationAttributes<User>) {
    return await this.userRepository.updateOneById(id, data);
  }

  async removeUser(id: number) {
    return await this.userRepository.deleteOneById(id);
  }
}
