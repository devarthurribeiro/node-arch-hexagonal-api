import { injectable } from "inversify";
import { IClientRepository } from "../../core/client/application/repository/IClientRepository";
import { Client } from "../../core/client/domain/Client";

@injectable()
export class ClientInMemoryRepository implements IClientRepository {
    private clients: Client[] = [];

    async create(client: Client): Promise<Client> {
        this.clients.push(client);
        return client;
    }

    async list(): Promise<Client[]> {
        return this.clients;
    }
}