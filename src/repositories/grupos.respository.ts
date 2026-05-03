import { prisma } from '../prisma/client';

export class GruposRepository {
    async criarGrupo(data: { nome: string; descricao: string }) {
        return prisma.grupos.create({ data });
    }

    async atribuirGrupo(id: number, gruposId: any) {
        return prisma.users.update({ where: { id }, data: { gruposId } });
    }

    async findGrupo(id: number) {
        return prisma.grupos.findUnique({ where: { id } });
    }

    async findMembros(gruposId: number) {
        return prisma.users.findMany({ where: { gruposId } });
    }

    async deleteGrupo(id: number) {
        return prisma.grupos.delete({ where: { id } });
    }
}
