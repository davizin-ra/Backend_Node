import { prisma } from '../prisma/client.js';

export class PalavrasRepository {
    async criarGenero(data: {
        tipo: string; // substantivo | verbo | artigo | ...
        itemId: string;
        regra: string;
        elemento: string;
        separado: string;
        conteudoM: string;
        conteudoF: string;
    }) {
        return prisma.genero.create({ data });
    }

    async criarSubstantivo(data: {
        plural: boolean;
        genero: boolean;
        conteudo: string;
        significado: string;
    }) {
        return prisma.substantivos.create({ data });
    }

    // find

    async findGenero (tipo:string, itemId:string){
        return prisma.genero.findFirstOrThrow({where: {tipo, itemId}})
    }

    async findSubstantivo (id:string){
        return prisma.substantivos.findFirstOrThrow({where: {id}})
    }
}
