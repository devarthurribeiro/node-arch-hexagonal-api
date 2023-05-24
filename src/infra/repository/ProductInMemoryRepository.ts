import { injectable } from "inversify";
import { IProductRepository } from "../../core/product/application/repository/IProductRepository";
import { Product } from "../../core/product/domain/Product";
import { UpdateProductDTO } from "../../core/product/domain/dtos/UpdateProductDTO";

@injectable()
export class ProductInMemoryRepository implements IProductRepository {
  private products: Product[] = [];

  async create(product: Product): Promise<Product> {
    this.products.push(product);

    return product;
  }

  async findById(id: string): Promise<Product | null> {
    const product = this.products.find((product) => product.id === id);
    return product || null;
  }

  async list(): Promise<Product[]> {
    return this.products;
  }

  async update(product: UpdateProductDTO): Promise<Product> {
    const productIndex = this.products.findIndex(
      (product) => product.id === product.id
    );
    this.products[productIndex] = product;

    return product;
  }

  async delete(id: string): Promise<void> {
    this.products = this.products.filter((product) => product.id !== id);
  }
}