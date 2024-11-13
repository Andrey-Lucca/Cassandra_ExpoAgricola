import client from "../../config";
import { v4 as uuidv4 } from "uuid";

type Registration = {
  numero_inscricao?: string;
  id_produtor: string;
  id_produto: string;
  tipo_produto: string;
  pontuacao_final: null | number;
  id_usuario: string;
};

class RegistrationModel {
  async createRegistration(registration: Registration): Promise<string> {
    const numeroInscricao = uuidv4();
    const query = `
        INSERT INTO inscricoes (numero_inscricao, id_produtor, id_produto, tipo_produto, pontuacao_final, id_usuario)
        VALUES (?, ?, ?, ?, ?, ?)
      `;
    const values = [
      numeroInscricao,
      registration.id_produtor,
      registration.id_produto,
      registration.tipo_produto,
      registration.pontuacao_final,
      registration.id_usuario,
    ];

    try {
      await client.execute(query, values, { prepare: true });
      return numeroInscricao;
    } catch (error) {
      console.error("Erro ao criar inscrição:", error);
      throw new Error("Erro ao criar inscrição");
    }
  }

  async getRegistrationByNumber(
    numeroInscricao: string
  ): Promise<Registration | null> {
    const query = `SELECT * FROM inscricoes WHERE numero_inscricao = ?`;
    const values = [numeroInscricao];

    try {
      const result = await client.execute(query, values, { prepare: true });
      if (result.rowLength > 0) {
        const row = result.rows[0];
        return {
          numero_inscricao: row.numero_inscricao,
          id_produtor: row.id_produtor,
          id_produto: row.id_produto,
          tipo_produto: row.tipo_produto,
          pontuacao_final: row.pontuacao_final,
          id_usuario: row.id_usuario,
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar inscrição:", error);
      return null;
    }
  }
}

export default new RegistrationModel();
