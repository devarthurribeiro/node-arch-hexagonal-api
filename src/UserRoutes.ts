import express, { Router } from "express";
import { container } from "./inversify.config";
import { IUserRepository } from "./IUserRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { UserInMemoryRepository } from "./UserInMemoryRepository";
import { JWTServiceAdapter } from "./JWTServiceAdapter";
import { LoginUserUseCase } from "./LoginUserUseCase";

const router: Router = express.Router();

const userRepository = container.resolve(UserInMemoryRepository);
const jwtService = container.resolve(JWTServiceAdapter);

const createUserUseCase = new CreateUserUseCase(userRepository, jwtService);
const loginUserUseCase = new LoginUserUseCase(userRepository, jwtService);

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  await createUserUseCase.execute({ name, email, password });
  res.status(201).send();
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const token = loginUserUseCase.execute(email, password);
  res.status(200).json({ token });
  res.status(200).send();
});

export { router as UserRoutes };