import express, { Router } from "express";
import { container } from "../inversify.config";
import { ProductInMemoryRepository } from "../repository/ProductInMemoryRepository";
import { ProductService } from "../../core/product/application/service/ProductService";

const router: Router = express.Router();

const productRepository = container.resolve(ProductInMemoryRepository);
const productService = new ProductService(productRepository);

router.post("/", async (req, res, next) => {
  try {
    const { name, price, image } = req.body;
    const product = await productService.createProduct({ name, price, image });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const products = await productService.listProducts();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const { id, name, price, image } = req.body;
    const product = await productService.updateProduct({
      id,
      name,
      price,
      image,
    });
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export { router as ProductRoutes };
