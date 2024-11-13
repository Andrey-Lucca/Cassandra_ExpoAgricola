import { Request, Response } from "express";
import ProductModel from "../models/ProductModel";

class ProductController {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await ProductModel.getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao buscar produtos" });
    }
  }
}

export default new ProductController();
