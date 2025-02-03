import { generateToken } from "../config/tokens";
import UserRepository from "../repositories/user.repository";
import { HttpError } from "../utils/httpError";

export default class AuthService {
  private userRepository: UserRepository;

  constructor({ userRepository }: { userRepository: UserRepository }) {
    this.userRepository = userRepository;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.getOne({ email });
    if (!user) throw new HttpError(401, "Wrong email or password");

    const isValid = await user.validatePassword(password);
    if (!isValid) throw new HttpError(401, "Wrong email or password");

    const token = generateToken(user);
    return { user, token };
  }
}
