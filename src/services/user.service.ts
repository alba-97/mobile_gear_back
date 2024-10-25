import { UserDto } from "../dto/user.dto";
import userRepository from "../repositories/user.repository";

const createUser = async (data: UserDto) => {
  return await userRepository.createOne(data);
};

const getUserById = async (id?: number) => {
  if (!id) return;
  return await userRepository.getOneById(id);
};

const listUsers = async () => {
  return await userRepository.findAll({});
};

const switchPrivileges = async (id: number) => {
  const user = await userRepository.getOneById(id);
  if (!user) return;

  const { is_admin, ...rest } = user;

  return await userRepository.updateOneById(id, {
    ...rest,
    is_admin: !is_admin,
  });
};

const updateUser = async (id: number, data: Partial<UserDto>) => {
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
