import { Request, Response } from "express";
import RegistrationModel from "../models/RegistrationsModel";

type Registration = {
  id_produtor: string;
  id_produto: string;
  tipo_produto: string;
  pontuacao_final: null | number;
  id_usuario: string;
};

class RegistrationController {
  async createRegistration(req: Request, res: Response) {
    try {
      const {
        id_produtor,
        id_produto,
        tipo_produto,
        pontuacao_final,
        id_usuario,
      } = req.body;

      const objRegistration = {
        id_produto,
        id_produtor,
        tipo_produto,
        pontuacao_final,
        id_usuario,
      };

      const registration = await RegistrationModel.createRegistration(
        objRegistration
      );
      res.status(201).json(registration);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar inscrição" });
      throw new Error("Error");
    }
  }
}

export default new RegistrationController();
