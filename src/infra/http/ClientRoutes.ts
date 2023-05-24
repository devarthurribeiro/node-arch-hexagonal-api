import express, { Router } from "express";
import { container } from "../inversify.config";
import { ClientInMemoryRepository } from "../repository/ClientInMemoryRepository";
import { ListClientsUseCase } from "../../core/client/application/usecase/ListClientsUseCase";
import { CreateClientUseCase } from "../../core/client/application/usecase/CreateClientUseCase";

const router: Router = express.Router();


const clientRepository = container.resolve(ClientInMemoryRepository);

const createUserUseCase = new CreateClientUseCase(clientRepository);
const listClientsUseCase = new ListClientsUseCase(clientRepository);

router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const client = await createUserUseCase.execute(name, email);
    res.status(201).json();
  } catch (error) {
    next(error)
  }
});


router.get("/", async (req, res, next) => {
  try {
    const clients = await listClientsUseCase.execute();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
});

export { router as ClientRoutes };