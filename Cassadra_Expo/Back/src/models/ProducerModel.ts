import client from "../../config";

type Producer = {
  id_produtor?: string;
  nome_produtor: string;
  municipio: string;
  bairro: string;
  telefone: string;
};

class ProducerModel {
  async getProducer(
    nome_produtor?: string,
    telefone?: string
  ): Promise<Producer[]> {
    let query = `SELECT * FROM produtores_rurais`;
    const filters = [];
    const values = [];

    if (nome_produtor) {
      filters.push("nome_produtor = ?");
      values.push(nome_produtor);
    }
    if (telefone) {
      filters.push("telefone = ?");
      values.push(telefone);
    }

    if (filters.length) {
      query += ` WHERE ${filters.join(" AND ")} ALLOW FILTERING`;
    }

    const result = await client.execute(query, values, { prepare: true });

    const rowsResult = result.rows.map((row) => ({
      id_produtor: row.get("id_produtor"),
      nome_produtor: row.get("nome_produtor"),
      municipio: row.get("municipio"),
      bairro: row.get("bairro"),
      telefone: row.get("telefone"),
    }));
    return rowsResult;
  }
}
export default new ProducerModel();
