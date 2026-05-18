import { Request, Response } from 'express';
import { PalavrasService } from '../services/palavras.service.js';

const serv = new PalavrasService();

export class PalavrasController {
    async criarSubstantivo(req: Request, res: Response) {
        try {
            const {
                plural,
                genero,
                conteudo,
                significado,
                generoData,
            } = req.body;
            const substantivo = await serv.criarSubstantivo(
                plural,
                genero,
                conteudo,
                significado,
                generoData
            );

            return res.json({
                message: 'Substantivo criado!!',
                substantivo: substantivo,
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    }

    async findSubstantivo(req: Request, res: Response) {
        try {
            const { id } = req.query as { id: string };
            const substantivo = await serv.findSubstantivo(id);

            return res.json(substantivo);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    }

    // pronomes

    async criarPronome(req: Request, res: Response) {
        try {
            const { pessoa, plural, genero, conteudo } = req.body;
            const pronome = await serv.criarPronome(
                pessoa,
                plural,
                genero,
                conteudo
            );
            return res.json({
                message: 'Pronome criado!!',
                pronome: pronome,
            });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    }
}
