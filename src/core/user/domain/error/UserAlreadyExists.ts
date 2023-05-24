import { ApplicationError } from "../../../shared/error/ApplicationError";

export class UserAlreadyExists extends ApplicationError {
  constructor() {
    super("User already exists");
    this.name = "UserAlreadyExists";
    this.statusCode = 409;
  }
}