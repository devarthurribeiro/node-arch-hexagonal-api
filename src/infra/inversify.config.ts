import { Container } from "inversify";
import { IUserRepository } from "../core/user/application/service/IUserRepository";
import { UserInMemoryRepository } from "./repository/UserInMemoryRepository";
import { IJWTService } from "../core/user/application/service/JWTService";
import { JWTServiceAdapter } from "./service/JWTServiceAdapter";
import { AuthService } from "./service/AuthService";
import { IAuthService } from "../core/user/application/service/IAuthService";
import { IClientRepository } from "../core/client/application/repository/IClientRepository";
import { ClientInMemoryRepository } from "./repository/ClientInMemoryRepository";
import { IProductRepository } from "../core/product/application/repository/IProductRepository";
import { ProductInMemoryRepository } from "./repository/ProductInMemoryRepository";
import { IProposalRepository } from "../core/proposal/application/repository/IProposalRepository";
import { ProposalInMemoryRepository } from "./repository/ProposalInMemoryRepository";
import { EmailService, IEmailService } from "./notification/EmailService";

const container = new Container();

container.bind<IUserRepository>("IUserRepository").to(UserInMemoryRepository);
container.bind<IJWTService>("IJWTService").to(JWTServiceAdapter);
container.bind<IAuthService>("IAuthService").to(AuthService);

container.bind<IClientRepository>("IClientRepository").to(ClientInMemoryRepository);

container.bind<IProductRepository>("IProductRepository").to(ProductInMemoryRepository);
container.bind<IProposalRepository>("IProposalRepository").to(ProposalInMemoryRepository);
container.bind<IEmailService>("IEmailService").to(EmailService);

export { container };
