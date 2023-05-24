import { faker } from "@faker-js/faker";
import { IClientRepository } from "../../src/core/client/application/repository/IClientRepository";
import { CreateClientUseCase } from "../../src/core/client/application/usecase/CreateClientUseCase";
import { container } from "../../src/infra/inversify.config";

describe("CreateClientUseCase", () => {

  const clientRepository = container.get<IClientRepository>("IClientRepository");
  const createClientUseCase = new CreateClientUseCase(clientRepository);

  it("criar um cliente", async () => {
    const client = await createClientUseCase.execute(faker.person.fullName(), faker.internet.email());
    expect(client).toBeTruthy()
  });

});
