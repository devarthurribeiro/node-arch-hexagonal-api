import { Proposal } from "../../domain/Proposal";

export interface IProposalRepository {
    create(proposal: Proposal): Promise<Proposal>;
    list(): Promise<Proposal[]>;
}
