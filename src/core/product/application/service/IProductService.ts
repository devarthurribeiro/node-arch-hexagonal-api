import { Product } from '../../domain/Product';
import { CreateProductDTO } from '../../domain/dtos/CreateProductDTO';
import { UpdateProductDTO } from '../../domain/dtos/UpdateProductDTO';

export interface IProductService {
    createProduct(dto: CreateProductDTO): Promise<Product>;
    deleteProduct(id: string): Promise<void>;
    updateProduct(dto: UpdateProductDTO): Promise<Product>;
    getProduct(id: string): Promise<Product>;
    listProducts(): Promise<Product[]>;
}
