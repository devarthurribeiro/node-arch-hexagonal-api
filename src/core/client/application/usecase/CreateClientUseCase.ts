import { inject, injectable } from "inversify";
import { Client } from "../../domain/Client";
import { IClientRepository } from "../repository/IClientRepository";

@injectable()
export class CreateClientUseCase {
    constructor(@inject("IClientRepository") private clientRepository: IClientRepository) {}

    async execute(name: string, email: string): Promise<Client> {
        const client = new Client({
            name,
            email
        });
        return await this.clientRepository.create(client);
    }
}
