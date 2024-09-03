import { Orders, Users } from "../models";

const createUser = async (userData: any) => {
  await Users.create(userData);
};

const getUserById = async (id?: number) => {
  return await Users.findOne({
    where: { id },
    attributes: { exclude: ["password", "salt"] },
    include: [Orders],
  });
};

const listUsers = async () => {
  return await Users.findAll({
    attributes: { exclude: ["password", "salt"] },
  });
};

const switchPrivileges = async (userId: number) => {
  const user = await Users.findByPk(userId);
  await Users.update(
    { is_admin: !user?.is_admin },
    { where: { id: user?.id } }
  );
};

const updateUser = async (data: any, where?: any) => {
  await Users.update(data, { where });
};

const removeUser = async (userId: number) => {
  await Users.destroy({ where: { id: userId } });
};

export default {
  createUser,
  getUserById,
  listUsers,
  switchPrivileges,
  updateUser,
  removeUser,
};
