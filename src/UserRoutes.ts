import express, { Router } from "express";
import { container } from "./inversify.config";
import { IUserRepository } from "./IUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { UserInMemoryRepository } from "./UserInMemoryRepository";

const router: Router = express.Router();

const userRepository = container.resolve(UserInMemoryRepository);
const createUserUseCase = new CreateUserUseCase(userRepository);

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  createUserUseCase.execute({ name, email, password });
  res.status(201).send();
});

router.post("/login", (req, res) => {
  res.status(200).send();
});

export { router as UserRoutes };
