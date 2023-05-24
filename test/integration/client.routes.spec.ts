import request from "supertest";
import { App } from "../../src/App";

describe("Client Routes /clients", () => {
  let app: App;
  let api: request.SuperTest<request.Test>;

  beforeAll(() => {
    app = new App();
    api = request(app.app);
  });

  it("deve criar um client", async () => {
    const clientDTO = { name: "John Doe", email: "john@example.com" };

    const response = await api.post("/clients").send(clientDTO);

    expect(response.status).toBe(201);
  });

  it("retorna uma lista de clientes", async () => {
    const response = await api.get("/clients");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe("John Doe");
  });
});
