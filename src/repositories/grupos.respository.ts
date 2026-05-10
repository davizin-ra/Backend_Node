import { prisma } from '../prisma/client.js';

export class GruposRepository {
    async criarGrupo(data: { nome: string; descricao: string }) {
        return prisma.grupos.create({ data });
    }

    async atribuirGrupo(id: string, gruposId: any) {
        return prisma.users.update({ where: { id }, data: { gruposId } });
    }

    async findGrupo(id: string) {
        return prisma.grupos.findUnique({ where: { id } });
    }

    async findMembros(gruposId: string) {
        return prisma.users.findMany({ where: { gruposId } });
    }

    async deleteGrupo(id: string) {
        return prisma.grupos.delete({ where: { id } });
    }
}
