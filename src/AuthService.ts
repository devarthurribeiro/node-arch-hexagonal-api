import bcrypt from "bcrypt";
import { IAuthService } from "./IAuthService";
import { injectable } from "inversify";

@injectable()
export class AuthService implements IAuthService {
  async comparePasswords(data: string, encrypted: string): Promise<Boolean> {
    return await bcrypt.compare(data, encrypted);
  }
}