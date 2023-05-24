import { ApplicationError } from "../../../shared/error/ApplicationError";

export class ProductNotFoundError extends ApplicationError {
  constructor() {
      super("Product not found");
      this.name = "ProductNotFoundError";
      this.statusCode = 404;
  }
}
