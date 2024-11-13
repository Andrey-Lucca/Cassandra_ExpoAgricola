import client from "../../config";

type Product = {
  id_produto?: string;
  nome_produto: string;
  variedade: string;
};

class ProductModel {
  async getAllProducts(): Promise<Product[]> {
    const result = await client.execute(`SELECT * FROM produtos_agricolas`);
    return result.rows.map((row) => ({
      id_produto: row.get("id_produto"),
      nome_produto: row.get("nome_produto"),
      variedade: row.get("variedade"),
    }));
  }
}

export default new ProductModel();
