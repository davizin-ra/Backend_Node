import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { prisma } from './prisma/client';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    
    res.json({
      api: 'rodando',
      database: 'conectado'
    });

  } catch (error) {
    res.status(500).json({
      api: 'rodando',
      database: 'desconectado'
    });
  }
});

app.use(routes);

export default app;
