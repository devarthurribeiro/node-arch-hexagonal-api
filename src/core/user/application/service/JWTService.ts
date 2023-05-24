import { User } from "../../domain/User";

export interface IJWTService {
  generateToken(user: User): string;
  hashPassword(password: string): Promise<string>;
}