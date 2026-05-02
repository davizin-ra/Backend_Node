import {Request, Response} from 'express';
import { UsuarioSevice } from '../services/usuario.service';

const service = new UsuarioSevice();

export class UsuarioController{

    async criar(req: Request, res: Response){
        const user = await service.criar(req.body)
        return res.status(201).json(user);
    }

    async listar(req: Request, res: Response){
        const users = await service.listar()
        return res.status(200).json(users)
    }

    async atualizar(req:Request, res: Response){
        const id = Number(req.params.id)
        await service.atualizar(id, req.body);
        
        return res.status(200).json({message: "Usuário atualizado"})
    }

    async deletar(req:Request, res: Response){
        const id = Number(req.params.id)
        await service.deletar(id)

        return res.status(200).json({message: "Usuário deletado"})
    }

}