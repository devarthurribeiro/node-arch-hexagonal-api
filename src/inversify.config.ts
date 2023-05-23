import { Container } from "inversify";
import { IUserRepository } from "./IUserRepository";
import { UserInMemoryRepository } from "./UserInMemoryRepository";
import { IJWTService } from "./JWTService";
import { JWTServiceAdapter } from "./JWTServiceAdapter";
import { AuthService } from "./AuthService";
import { IAuthService } from "./IAuthService";

const container = new Container();

container.bind<IUserRepository>("IUserRepository").to(UserInMemoryRepository);
container.bind<IJWTService>("IJWTService").to(JWTServiceAdapter);
container.bind<IAuthService>("IAuthService").to(AuthService);

export { container };
