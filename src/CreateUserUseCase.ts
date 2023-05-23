import { User } from "./User";
import { IUserRepository } from "./IUserRepository";
import { inject, injectable } from "inversify";

type CreateUserRequest = {
    name: string;
    email: string;
    password: string;
};

@injectable()
export class CreateUserUseCase {
    constructor(@inject("IUserRepository") private userRepository: IUserRepository) {}

    async execute(input: CreateUserRequest): Promise<User> {
        const user = new User(input);
        return await this.userRepository.create(user);
    }
}
