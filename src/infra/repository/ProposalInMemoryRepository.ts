import { injectable } from "inversify";
import { IProposalRepository } from "../../core/proposal/application/repository/IProposalRepository";
import { Proposal } from "../../core/proposal/domain/Proposal";

@injectable()
export class ProposalInMemoryRepository implements IProposalRepository {
    private proposals: Proposal[] = [];

    async create(proposal: Proposal): Promise<Proposal> {
        this.proposals.push(proposal);
        return proposal;
    }

    async list(): Promise<Proposal[]> {
        return this.proposals;
    }
}