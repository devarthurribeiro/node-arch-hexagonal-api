import { IUserRepository } from "./IUserRepository";
import { IJWTService } from "./JWTService";
import { inject, injectable } from "inversify";
import { IAuthService } from "./IAuthService";

@injectable()
export class LoginUserUseCase {
    constructor(
        @inject("IUserRepository") private userRepository: IUserRepository,
        @inject("JWTService") private jwtService: IJWTService,
        @inject("AuthService") private authService: IAuthService
    ) {}

    async execute(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);

        if (user && await this.authService.comparePasswords(password, user.password)) {
            return this.jwtService.generateToken(user);
        }
        
        throw new Error("Invalid email or password");
    }
}
