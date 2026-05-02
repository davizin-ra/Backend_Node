import express, { Request, Response } from 'express';
import usuarioRoutes from './routes/usuario.routes';
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('BackEnd Funcionando');
});

app.use(express.json());
app.use(usuarioRoutes);

export default app;
