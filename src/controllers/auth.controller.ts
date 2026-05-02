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

    async cadastro(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            const result = await serv.cadastro(email, senha);

            return res.status(201).json({
                message: 'Cadastro realizado com sucesso',
                user: result,
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    async resetSenha(req: Request, res: Response) {
        try {
            const { token, senha } = req.body;

            const result = await serv.resetSenha(token, senha);

            return res.status(200).json({
                message: 'Senha alterada com sucesso',
                user: result.email,
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }

    async tokenReset(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const result = await serv.tokenReset(email);

            return res.status(201).json({
                message: 'Requisição criada com sucesso',
                token: result,
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message,
            });
        }
    }
}
