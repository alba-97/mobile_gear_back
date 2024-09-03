import { generateToken } from "../config/tokens";
import { Users } from "../models";

const login = async (email: string, password: string) => {
  const user = await Users.findOne({ where: { email } });
  if (!user) throw new Error("Users doesn't exist");

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

export default { login };
