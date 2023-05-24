import express, { Router } from "express";
import { container } from "./inversify.config";
import { IUserRepository } from "./core/user/application/service/IUserRepository";
import { CreateUserUseCase } from "./core/user/application/usecase/CreateUserUseCase";
import { UserInMemoryRepository } from "./infra/repository/UserInMemoryRepository";
import { JWTServiceAdapter } from "./infra/service/JWTServiceAdapter";
import { LoginUserUseCase } from "./core/user/application/usecase/LoginUserUseCase";
import { AuthService } from "./infra/service/AuthService";

const router: Router = express.Router();

const userRepository = container.resolve(UserInMemoryRepository);
const jwtService = container.resolve(JWTServiceAdapter);
const authService = container.resolve(AuthService);

const createUserUseCase = new CreateUserUseCase(userRepository, jwtService);
const loginUserUseCase = new LoginUserUseCase(userRepository, jwtService, authService);

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