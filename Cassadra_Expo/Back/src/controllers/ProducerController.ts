import { Request, Response } from "express";
import ProducerModel from "../models/ProducerModel";

class ProducerController {
  async getProducer(req: Request, res: Response): Promise<void> {
    try {
      const { nome_produtor, telefone } = req.body;
      const producer = await ProducerModel.getProducer(
        nome_produtor as string | undefined,
        telefone as string | undefined
      );
      res.status(200).json(producer);
    } catch (error) {
        console.log(error)
      res.status(500).json({ error: "Erro ao buscar produtores" });
    }
  }
}

export default new ProducerController();
