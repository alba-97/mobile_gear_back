import { generateToken } from "../config/tokens";
import userRepository from "../repositories/user.repository";

const login = async (email: string, password: string) => {
  const user = await userRepository.getOne({ email });
  if (!user) throw new Error("Unauthorized");

  const isValid = await user.validatePassword(password);
  if (!isValid) throw new Error("Unauthorized");

  const token = generateToken(user);

  return { user, token };
};

export default { login };
