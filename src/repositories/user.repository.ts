import { prisma } from '../prisma/client';

export class UserRepository {
    async findByEmail(email: string) {
        return prisma.users.findUnique({ where: { email } });
    }

    async findById(id: number) {
        return prisma.users.findUnique({ where: { id } });
    }

    async cadastroUser(data: { email: string; senha: string }) {
        return prisma.users.create({ data });
    }

    async senhaReset(id: number, senha: string) {
        return prisma.users.update({
            where: { id: id },
            data: { senha },
        });
    }

    async tokenReset(data: { userId: number; token: string; expiresAt: Date }) {
        return prisma.resetToken.create({ data });
    }

    async findToken(token: string) {
        return prisma.resetToken.findUnique({ where: { token } });
    }

    async deleteToken(token: string) {
        return prisma.resetToken.delete({ where: { token } });
    }

    async deleteAllTokens(userId: number) {
        return prisma.resetToken.deleteMany({ where: { userId } });
    }
}
