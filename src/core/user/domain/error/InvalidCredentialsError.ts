import { ApplicationError } from "../../../shared/error/ApplicationError";

export class InvalidCredentialsError extends ApplicationError {
  constructor() {
      super("Invalid email or password");
      this.name = "InvalidCredentialsError";
      this.statusCode = 401;
  }
}
