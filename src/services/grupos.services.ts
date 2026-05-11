import { GruposRepository } from '../repositories/grupos.respository.js';
import { UserRepository } from '../repositories/user.repository.js';

const repo = new GruposRepository();
const repoU = new UserRepository();

export class GruposServices {
    async criarGrupo(nome: string, descricao: string, userId: string) {
        const user = await repoU.findById(userId);

        if (!user) {
            throw new Error('Usuário não encontrado;');
        }

        if (user.gruposId) {
            throw new Error('Você já está em um grupo');
        }

        const grupo = await repo.criarGrupo({
            nome: nome,
            descricao: descricao,
        });

        await repo.atribuirGrupo(user.id, grupo.id);

        return grupo;
    }

    async acharGrupo(userId: string) {
        const user = await repoU.findById(userId);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if (!user.gruposId) {
            throw new Error('Você não está em nenhum grupo');
        }

        const grupo = await repo.findGrupo(user.gruposId);

        return grupo;
    }

    async acharMembros(gruposId: string) {
        const membros = await repo.findMembros(gruposId);

        if (!membros) {
            throw new Error('Nenhuma pessoa nesse grupo.');
        }

        return membros;
    }

    async sairGrupo(userId: string) {
        const user = await repoU.findById(userId);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if (!user.gruposId) {
            throw new Error('Você não está em nenhum grupo');
        }

        const membros = await repo.findMembros(user.gruposId);
        const grupoId = user.gruposId;

        if (membros.length == 1) {
            await repo.deleteGrupo(grupoId);

            return 'Você era o ultimo, grupo excluido';
        }

        await repo.atribuirGrupo(user.id, null);

        return 'Você saiu do grupo';
    }

    async atribuirGrupo(id: string, gruposId: string) {
        const user = await repoU.findById(id);

        if (!user) {
            throw new Error('Usuario não encontrado');
        }

        const grupo = await repo.findGrupo(gruposId);

        if (user.gruposId) {
            throw new Error('Você ja está em um grupo');
        }

        if (!grupo) {
            throw new Error('Grupo não encontrado');
        }

        await repo.atribuirGrupo(user.id, gruposId);

        return 'Atribuido ao grupo ' + grupo.nome;
    }
}
