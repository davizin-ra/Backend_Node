import { prisma } from '../prisma/client.js';

export class PalavrasRepository {
    // genero

    async criarGenero(data: {
        tipo: string; // substantivo | verbo | artigo | ...
        itemId: string;
        regra: string;
        elemento?: string;
        separado?: string;
        conteudoM?: string;
        conteudoF?: string;
    }) {
        return prisma.genero.create({ data });
    }

    async findGenero(tipo: string, itemId: string) {
        return prisma.genero.findFirstOrThrow({ where: { tipo, itemId } });
    }

    // substantivo

    async criarSubstantivo(data: {
        plural: boolean;
        genero: boolean;
        conteudo: string;
        significado: string;
    }) {
        return prisma.substantivos.create({ data });
    }

    async findSubstantivo(id: string) {
        return prisma.substantivos.findFirstOrThrow({ where: { id } });
    }

    // pronome

    async criarPronome(data: {
        pessoa: number;
        plural: boolean;
        genero?: string;
        conteudo: string;
    }){
        return prisma.pronomes.create({data})
    };
}
