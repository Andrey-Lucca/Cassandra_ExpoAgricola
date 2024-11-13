import express from 'express';
import cors from "cors";
import ProductRoutes from './routes/ProductsRoutes';
import ProducerRoutes from './routes/ProducerRoutes';
import RegistrationRoutes from './routes/RegistrationRoutes';

const app = express();
app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use('/api', ProductRoutes);
app.use('/api', ProducerRoutes);
app.use('/api', RegistrationRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});