import { Router } from "express";
import RegistrationController from "../controllers/RegistrationController";

const router = Router();

router.post("/registration", RegistrationController.createRegistration);

export default router;