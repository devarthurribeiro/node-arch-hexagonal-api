import { Container } from "inversify";
import { IUserRepository } from "./IUserRepository";
import { UserInMemoryRepository } from "./UserInMemoryRepository";

const container = new Container();
container.bind<IUserRepository>("IUserRepository").to(UserInMemoryRepository);

export { container };
