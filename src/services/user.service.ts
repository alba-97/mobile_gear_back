import { Order, User } from "../models";

const createUser = async (userData: any) => {
  await User.create(userData);
};

const getUserById = async (id?: number) => {
  return await User.findOne({
    where: { id },
    attributes: { exclude: ["password", "salt"] },
    include: [Order],
  });
};

const listUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password", "salt"] },
  });
};

const switchPrivileges = async (userId: number) => {
  const user = await User.findByPk(userId);
  await User.update({ is_admin: !user?.is_admin }, { where: { id: user?.id } });
};

const updateUser = async (data: any, where?: any) => {
  await User.update(data, { where });
};

const removeUser = async (userId: number) => {
  await User.destroy({ where: { id: userId } });
};

export default {
  createUser,
  getUserById,
  listUsers,
  switchPrivileges,
  updateUser,
  removeUser,
};
