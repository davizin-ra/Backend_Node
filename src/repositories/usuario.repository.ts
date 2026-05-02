import {prisma} from "../prisma/client"

export class UsuarioRepository {

    create(data: {nome: string}){
        return prisma.user.create({ data });
    }

    findAll(){
        return prisma.user.findMany();
    }

    update(id: number, data:{nome?: string}){
        return prisma.user.update({
            where: {id},
            data
        });
    }

    delete(id: number){
        return prisma.user.delete({
            where: {id}
        })
    }

}