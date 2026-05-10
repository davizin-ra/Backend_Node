import express from 'express';
import cors from 'cors';
import "dotenv/config";
import routes from './routes/index.js';
import { prisma } from './prisma/client.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
    try {
        await prisma.$connect;

        res.json({
            api: 'rodando',
            database: 'conectado',
        });
    } catch (error) {
        res.status(500).json({
            api: 'rodando',
            database: 'desconectado',
        });
    }
});

app.use(routes);

export default app;
