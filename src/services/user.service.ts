import { CreationAttributes } from "sequelize";
import userRepository from "../repositories/user.repository";
import { User } from "../models";

const createUser = async (data: CreationAttributes<User>) => {
  return await userRepository.createOne(data);
};

const getUserById = async (id?: number) => {
  if (!id) return null;
  return await userRepository.getOneById(id);
};

const listUsers = async () => {
  return await userRepository.getAll({});
};

const switchPrivileges = async (id: number) => {
  const user = await userRepository.getOneById(id);
  if (!user) return;

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
