import { CreationAttributes } from "sequelize";
import userRepository from "../repositories/user.repository";
import { User } from "../models";
import { HttpError } from "../utils/httpError";

const createUser = async (data: CreationAttributes<User>) => {
  return await userRepository.createOne(data);
};

const getUserById = async (id: number) => {
  const user = await userRepository.getOneById(id);
  if (!user) throw new HttpError(404, "User not found");
  return user;
};

const listUsers = async () => {
  return await userRepository.getAll();
};

const switchPrivileges = async (id: number) => {
  const user = await userRepository.getOneById(id);
  if (!user) throw new HttpError(404, "User not found");

  const { isAdmin, ...rest } = user;

  return await userRepository.updateOneById(id, {
    ...rest,
    isAdmin: !isAdmin,
  });
};

const updateUser = async (id: number, data: CreationAttributes<User>) => {
  return await userRepository.updateOneById(id, data);
};

const removeUser = async (id: number) => {
  return await userRepository.deleteOneById(id);
};

export default {
  createUser,
  getUserById,
  listUsers,
  switchPrivileges,
  updateUser,
  removeUser,
};
