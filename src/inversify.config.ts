import { Container } from "inversify";
import { IUserRepository } from "./core/user/application/service/IUserRepository";
import { UserInMemoryRepository } from "./infra/repository/UserInMemoryRepository";
import { IJWTService } from "./core/user/application/service/JWTService";
import { JWTServiceAdapter } from "./infra/service/JWTServiceAdapter";
import { AuthService } from "./infra/service/AuthService";
import { IAuthService } from "./core/user/application/service/IAuthService";

const container = new Container();

container.bind<IUserRepository>("IUserRepository").to(UserInMemoryRepository);
container.bind<IJWTService>("IJWTService").to(JWTServiceAdapter);
container.bind<IAuthService>("IAuthService").to(AuthService);

export { container };
