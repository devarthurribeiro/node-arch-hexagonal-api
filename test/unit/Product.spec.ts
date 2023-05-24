import { v4 } from "uuid";
import { Product } from "../../src/core/product/domain/Product";
import { productFactory } from "../factories/ProductFactory";

describe("Product", () => {
  const newProduct = productFactory.build();

  it("cria um produto", () => {
    const product = new Product(newProduct);

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBeTruthy();
  });

  it("cria produto com id", () => {
    const uuid = v4();
    const product = new Product(newProduct, uuid);

    expect(product).toBeInstanceOf(Product);
    expect(product.id).toBe(uuid);

    expect(product.name).toBe(newProduct.name);
    expect(product.price).toBe(newProduct.price);
    expect(product.image).toBe(newProduct.image);
  });
});
