import { injectable, inject } from "inversify";
import { IProductService } from "./IProductService";
import { Product } from "../../domain/Product";
import { ProductNotFoundError } from "../../domain/error/ProductNotFoundError";
import { IProductRepository } from "../repository/IProductRepository";
import { CreateProductDTO } from "../../domain/dtos/CreateProductDTO";
import { UpdateProductDTO } from "../../domain/dtos/UpdateProductDTO";


@injectable()
export class ProductService implements IProductService {
    constructor(@inject('ProductRepository') private productRepository: IProductRepository) {}

    async createProduct(product: CreateProductDTO): Promise<Product> {
        const newProduct = new Product(product);
        return await this.productRepository.create({...newProduct});
    }

    async getProduct(id: string): Promise<Product> {
      const product = await this.productRepository.findById(id);
      if (!product) throw new ProductNotFoundError();

      return product;
  }

  async listProducts(): Promise<Product[]> {
      return await this.productRepository.list();
  }

  async updateProduct(product: UpdateProductDTO): Promise<Product> {
      const productExists = await this.productRepository.findById(product.id);
      if (!productExists) throw new ProductNotFoundError();
      return await this.productRepository.update(product)
  }


    async deleteProduct(id: string): Promise<void> {
        const product = await this.productRepository.findById(id);
        if (!product) throw new ProductNotFoundError();

        await this.productRepository.delete(id);
    }

}
