import { inject, injectable } from "inversify";
import { IProposalRepository } from "../repository/IProposalRepository";

@injectable()
export class ListProposalsUseCase {
  constructor(@inject("IProposalRepository") private proposalRepository: IProposalRepository) {}

  async execute() {
    const proposals = await this.proposalRepository.list();
    return proposals;
  }
}