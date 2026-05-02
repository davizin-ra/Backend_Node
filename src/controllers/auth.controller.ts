import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';

const serv = new AuthService();

export class AuthController {
    async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            const result = await serv.login(email, senha);

            return res.json(result);
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }
}
