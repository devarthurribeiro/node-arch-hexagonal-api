import request from "supertest";
import { App } from "../../src/App";

describe("User API", () => {
    let app: App;
    let api: request.SuperTest<request.Test>;

    beforeAll(() => {
        app = new App();
        api = request(app.app);
    });

    it("should register a new user", async () => {
        const userDTO = { name: "John Doe", email: "john@example.com", password: "password" };

        const response = await api.post("/users/register").send(userDTO);

        expect(response.status).toBe(201);
    });

    it("should login a user", async () => {
        const email = "john@example.com";
        const password = "password";

        const response = await api.post("/users/login").send({ email, password });

        expect(response.status).toBe(200);
        expect(response.body.token).toBeTruthy();
    });
});
