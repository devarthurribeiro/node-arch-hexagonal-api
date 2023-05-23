import cors from 'cors'
import express from "express";
import { UserRoutes } from './UserRoutes';

export class App {
    readonly app;

    constructor() {
        this.app = express();
        this.setupMiddlewares();
        this.setupRoutes();
    }

    private setupMiddlewares(): void {
        this.app.use(express.json());
        this.app.use(cors())
    }

    private setupRoutes(): void {
        this.app.use("/users", UserRoutes);
    }

    public start(port: number): void {
        this.app.listen(port = 3000, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}
