import { Product } from "../../domain/Product";
import { CreateProductDTO } from "../../domain/dtos/CreateProductDTO";
import { UpdateProductDTO } from "../../domain/dtos/UpdateProductDTO";

export interface IProductRepository {
    create(dto: CreateProductDTO): Promise<Product>;
    findById(id: string): Promise<Product | null>;
    list(): Promise<Product[]>;
    update(product: UpdateProductDTO): Promise<Product>;
    delete(id: string): Promise<void>;

}
