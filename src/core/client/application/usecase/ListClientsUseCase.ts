import { inject, injectable } from "inversify";
import { IClientRepository } from "../repository/IClientRepository";
import { Client } from "../../domain/Client";

@injectable()
export class ListClientsUseCase {
    constructor(@inject("IClientRepository") private clientRepository: IClientRepository) {}

    async execute(): Promise<Client[]> {
        return await this.clientRepository.list();
    }
}
