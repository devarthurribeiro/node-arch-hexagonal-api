import request from "supertest";
import { App } from "../../src/App";
import { Product } from "../../src/core/product/domain/Product";
import { Client } from "../../src/core/client/domain/Client";
import { productFactory } from "../factories/ProductFactory";

describe("Proposal Routes /proposal", () => {
  let app: App;
  let api: request.SuperTest<request.Test>;

  beforeAll(() => {
    app = new App();
    api = request(app.app);
  });

  const client: Client = {
    id: "client_id",
    name: "John Doe",
    email: "arnulfo.stamm67@ethereal.email",
  };

  const products: Product[] = productFactory.buildList(10);

  it("cria uma proposal", async () => {
    const response = await api.post("/proposals").send({
      client,
      products,
      createdAt: new Date(),
    });
    expect(response.status).toBe(201);
  });

  it("retorna uma lista de proposals", async () => {
    const response = await api.get("/proposals");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
