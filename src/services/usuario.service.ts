import {UsuarioRepository} from "../repositories/usuario.repository"

const repo = new UsuarioRepository();

export class UsuarioSevice{

    async criar(data:any){
        return repo.create(data)
    }

    async listar(){
        return repo.findAll()
    }

    async atualizar(id:number, data:any){
        return repo.update(id, data)
    }

    async deletar(id:number){
        return repo.delete(id)
    }
}