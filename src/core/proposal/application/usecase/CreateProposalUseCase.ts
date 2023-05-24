import { inject, injectable } from "inversify";
import { Client } from "../../../client/domain/Client";
import { Product } from "../../../product/domain/Product";
import { Proposal } from "../../domain/Proposal";
import { IProposalRepository } from "../repository/IProposalRepository";
import { EmailService } from "../../../../infra/notification/EmailService";

type CreateProposalRequest = {
    client: Client;
    products: Product[];
    createAt: Date;
};

@injectable()
export class CreateProposalUseCase {
    constructor(
        @inject("IProposalRepository") private proposalRepository: IProposalRepository,
        @inject("EmailService") private emailService: EmailService,
    ) {}

    async execute(input: CreateProposalRequest): Promise<Proposal> {
        const proposal = new Proposal(input);
        const savedProposal = await this.proposalRepository.create(proposal);

        await this.emailService.sendEmail(savedProposal.client.email, savedProposal.emailRecipientText());

        return savedProposal;
    }
}
