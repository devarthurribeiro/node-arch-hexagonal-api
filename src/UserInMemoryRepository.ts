import { User } from "./User";
import { IUserRepository } from "./IUserRepository";
import { injectable } from "inversify";

@injectable()
export class UserInMemoryRepository implements IUserRepository {
    private users: User[] = [];

    async create(user: User): Promise<User> {
        this.users.push(user);
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.users.find((user) => user.email === email);
        return user || null;
    }
}