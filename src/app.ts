import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import mainRoutes from './routes/main.route';
import userRoutes from './routes/user.route';
import productRoutes from './routes/product.route';
import healthRoutes from './routes/health.route';
import { errorHandler } from './middlewares/error.middleware';
import companyRoutes from './routes/company.route';
import cardRoutes from './routes/card.route';
import movementRoutes from './routes/movement.route';
import resourceRoutes from './routes/resource.route';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(compression());

// Routes
app.use("/", mainRoutes);
app.use("/health", healthRoutes);
app.use("/api/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/product", productRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/movement", movementRoutes);
app.use("/api/resource", resourceRoutes);
app.use(errorHandler);

export default app;