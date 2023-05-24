import request from "supertest";
import { App } from "../../src/App";
import { Product } from "../../src/core/product/domain/Product";
import { container } from "../../src/infra/inversify.config";
import { ProductService } from "../../src/core/product/application/service/ProductService";
import { ProductInMemoryRepository } from "../../src/infra/repository/ProductInMemoryRepository";
import { productFactory } from "../factories/ProductFactory";

describe("Product Routes /products", () => {
  let app: App;
  let api: request.SuperTest<request.Test>;

  beforeAll(() => {
    app = new App();
    api = request(app.app);
   
  });

  it("cria um product", async () => {
    let product = productFactory.build();
    const response = await api.post("/products").send(product);
    expect(response.status).toBe(201);
  });

  it("retorna uma lista de products", async () => {
    const response = await api.get("/products");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it("atualliza um product", async () => {
    const { body } = await api.post("/products").send(productFactory.build());
    
    const response = await api.put("/products").send({
      ...body,
      name: "Product Updated",
    });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product Updated");
  });

  it("deleta um product", async () => {
    const newProduct = await api.post("/products").send(productFactory.build());
    
    const response = await api.delete("/products/"+newProduct.body.id);
    expect(response.status).toBe(204);
  });
});
