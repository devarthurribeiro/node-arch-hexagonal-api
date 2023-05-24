import cors from "cors";
import express from "express";
import { UserRoutes } from "./UserRoutes";
import errorHandler from "./infra/http/ErrorHandler";

export class App {
  readonly app;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private setupRoutes(): void {
    this.app.use("/users", UserRoutes);
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen((port = 3000), () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
