import request from "supertest";
import { App } from "../../src/App";

describe("User Routes /users", () => {
  let app: App;
  let api: request.SuperTest<request.Test>;
  const userDTO = {
    name: "John Doe",
    email: "john@example.com",
    password: "password",
  };

  beforeAll(() => {
    app = new App();
    api = request(app.app);
  });

  it("cria um usuário", async () => {
    const response = await api.post("/users/register").send(userDTO);
    expect(response.status).toBe(201);
  });

  it("tenta criar um usuário existente", async () => {
    const response = await api.post("/users/register").send(userDTO);
    expect(response.status).toBe(409);
    expect(response.body.message).toBe("User already exists");
  });

  it("faz login e retornar um token JWT", async () => {
    const email = "john@example.com";
    const password = "password";

    const response = await api.post("/users/login").send({ email, password });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("tenta fazer login com credencial inválida", async () => {
    const email = "john@example.com";
    const password = "password-invalid";

    const response = await api.post("/users/login").send({ email, password });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password");
  });
});
