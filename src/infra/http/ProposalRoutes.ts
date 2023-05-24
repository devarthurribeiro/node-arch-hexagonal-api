import express, { Router } from "express";
import { container } from "../inversify.config";
import { ProposalInMemoryRepository } from "../repository/ProposalInMemoryRepository";
import { CreateProposalUseCase } from "../../core/proposal/application/usecase/CreateProposalUseCase";
import { ListProposalsUseCase } from "../../core/proposal/application/usecase/ListProposalUseCase";
import { EmailService } from "../notification/EmailService";
import { IProposalRepository } from "../../core/proposal/application/repository/IProposalRepository";

const router: Router = express.Router();

const proposalRepository = container.get<IProposalRepository>("IProposalRepository");
const emailService = container.resolve(EmailService);
const createProposalUseCase = new CreateProposalUseCase(proposalRepository, emailService);
const listProposalsUseCase = new ListProposalsUseCase(proposalRepository);

router.post("/", async (req, res, next) => {
  try {
    const { client, products, createAt } = req.body;
    const proposal = await createProposalUseCase.execute({
      client,
      products,
      createAt: new Date(createAt),
    });
    res.status(201).json(proposal);
  } catch (error) {
    console.log(error)
    next(error)
  }
});


router.get("/", async (req, res, next) => {
  try {
    const clients = await listProposalsUseCase.execute();
    res.status(200).json(clients);
  } catch (error) {
    next(error);
  }
});

export { router as ProposalRoutes };