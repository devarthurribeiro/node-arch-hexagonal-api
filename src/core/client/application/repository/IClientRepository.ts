import { Client } from "../../domain/Client";

export interface IClientRepository {
    create(client: Client): Promise<Client>;
    list(): Promise<Client[]>;
}
