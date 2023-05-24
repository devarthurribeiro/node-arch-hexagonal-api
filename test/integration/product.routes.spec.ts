import request from "supertest";
import { App } from "../../src/App";
import { Product } from "../../src/core/product/domain/Product";

describe("Product Routes /products", () => {
  let app: App;
  let api: request.SuperTest<request.Test>;
  let mockProductId = "product-1";
  let product = new Product(
    {
      name: "Product 1",
      price: 10.0,
    },
    mockProductId
  );

  beforeAll(() => {
    app = new App();
    api = request(app.app);
   
  });

  it("cria um product", async () => {
    const response = await api.post("/products").send(product);
    expect(response.status).toBe(201);
  });

  it("retorna uma lista de products", async () => {
    const response = await api.get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("atualliza um product", async () => {
    const response = await api.put("/products").send({
      ...product,
      name: "Product 1 Updated",
    });
    expect(response.status).toBe(200);
  });

  it("deleta um product", async () => {
    const response = await api.delete("/products/"+mockProductId);
    expect(response.status).toBe(200);
  });
});
