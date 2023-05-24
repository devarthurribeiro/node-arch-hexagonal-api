import { faker } from "@faker-js/faker";
import { IClientRepository } from "../../src/core/client/application/repository/IClientRepository";
import { ListClientsUseCase } from "../../src/core/client/application/usecase/ListClientsUseCase";
import { container } from "../../src/infra/inversify.config";

describe("ListClientsUseCase", () => {

  const clientRepository = container.get<IClientRepository>("IClientRepository");
  const listClientUseCase = new ListClientsUseCase(clientRepository);

  it("retorna lista vazia de clientes", async () => {
    const clients = await listClientUseCase.execute();
    expect(clients).toBeTruthy()
  });

  it("retorna lista com clientes", async () => {
    await clientRepository.create({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
    });

    const clients = await listClientUseCase.execute();
    expect(clients.length).toBe(1)
  });

});
