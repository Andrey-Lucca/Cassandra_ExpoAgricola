import { Router } from "express";
import ProducerController from "../controllers/ProducerController";

const router = Router();

router.post("/producers", ProducerController.getProducer);

export default router;
