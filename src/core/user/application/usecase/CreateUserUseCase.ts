import { User } from "../../domain/User";
import { IUserRepository } from "../service/IUserRepository";
import { inject, injectable } from "inversify";
import { IJWTService } from "../service/JWTService";

type CreateUserRequest = {
  name: string;
  email: string;
  password: string;
};

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("IUserRepository") private userRepository: IUserRepository,
    @inject("IJWTService") private jwtService: IJWTService
  ) {}

  async execute(input: CreateUserRequest): Promise<User> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      input.email
    );
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const passwordHashed = await this.jwtService.hashPassword(input.password);
    const user = new User({
      ...input,
      password: passwordHashed,
    });

    return await this.userRepository.create(user);
  }
}
