import { faker } from "@faker-js/faker";
import { Product } from "../../src/core/product/domain/Product";
import { IFactory } from "./IFactory";

class ProductFactory implements IFactory<Product> {
  build(): Product {
    return new Product({
      name: faker.commerce.productName(),
      price: faker.number.int({
        min: 10,
        max: 999,
      }),
      image: faker.image.url(),
    });
  }
  buildList(size: number): Product[] {
    const products: Product[] = [];
    for (let i = 0; i < size; i++) {
      products.push(this.build());
    }
    return products;
  }
}

export const productFactory = new ProductFactory();