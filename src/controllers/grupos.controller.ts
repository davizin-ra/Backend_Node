import { Request, Response } from 'express';
import { GruposServices } from '../services/grupos.services';

const serv = new GruposServices();

export class GruposController {
    async criarGrupo(req: Request, res: Response) {
        try {
            const { nome, descricao, userId } = req.body;
            const result = await serv.criarGrupo(nome, descricao, userId);

            return res.json({
                message: 'Grupo criado!!',
                group: result,
            });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }

    async acharGrupo(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const result = await serv.acharGrupo(userId);

            return res.json({
                result,
            });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }

    async acharMembros(req: Request, res: Response) {
        try {
            const { gruposId } = req.body;
            const result = await serv.acharMembros(gruposId);

            return res.json({
                result,
            });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }

    async sairGrupo(req: Request, res: Response) {
        try {
            const { userId } = req.body;
            const result = await serv.sairGrupo(userId);

            return res.json({
                result,
            });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }

    async atribuirGrupo(req: Request, res: Response) {
        try {
            const { userId, gruposId } = req.body;
            const result = await serv.atribuirGrupo(userId, gruposId);

            return res.json({
                result,
            });
        } catch (error: any) {
            return res.status(401).json({ message: error.message });
        }
    }
}
