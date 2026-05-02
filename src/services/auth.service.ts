import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';

const repo = new UserRepository();

export class AuthService {
    async login(email: string, senha: string) {
        const user = await repo.findByEmail(email);
        if (!user || user.senha !== senha) {
            throw new Error('Usuário não encontrado');
        }
        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return token;
    }
}
