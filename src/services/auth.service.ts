import { generateToken } from "../config/tokens";
import userRepository from "../repositories/user.repository";
import { HttpError } from "../utils/httpError";

const login = async (email: string, password: string) => {
  const user = await userRepository.getOne({ email });
  if (!user) throw new HttpError(401, "Unauthorized");

  const isValid = await user.validatePassword(password);
  if (!isValid) throw new HttpError(401, "Unauthorized");

  const token = generateToken(user);

  return { user, token };
};

export default { login };
