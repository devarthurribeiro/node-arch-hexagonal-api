import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { User } from "../../core/user/domain/User";
import { IJWTService } from "../../core/user/application/service/JWTService";
import { injectable } from "inversify";

@injectable()
export class JWTServiceAdapter implements IJWTService {
  generateToken(user: User) {
    return jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }
}