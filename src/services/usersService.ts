import { Users } from "../models";
import { generateToken } from "../config/tokens";

const login = async (email: string, password: string) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) throw new Error("Unauthorized");

  const isValid = await user.validatePassword(password);
  if (!isValid) throw new Error("Unauthorized");

  const payload = {
    id: user.id,
    email: user.email,
    password: user.password,
    is_admin: user.is_admin,
  };

  const token = generateToken(payload);
  return { user, token };
};

const signup = async (userData: any) => {
  await Users.create(userData);
};

const getUserById = async (id?: number) => {
  return await Users.findOne({
    where: { id },
    attributes: { exclude: ["password", "salt"] },
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
  login,
  signup,
  getUserById,
  listUsers,
  switchPrivileges,
  updateUser,
  removeUser,
};
