import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';
import { transporter } from './mail.service.js';
import crypto from 'crypto';
import bcrypt from 'bcrypt';

const repo = new UserRepository();

export class AuthService {
    async login(email: string, senha: string) {
        const user = await repo.findByEmail(email);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const senhaValida = await bcrypt.compare(senha, user.senha);

        if (!senhaValida) {
            throw new Error('Credenciais inválidas');
        }

        const token = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        return {
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                grupo: user.gruposId
            },
            token,
        };
    }

    async cadastro(email: string, senha: string) {
        const userExiste = await repo.findByEmail(email);

        if (userExiste) {
            throw new Error('Usuário já existente, faça login.');
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        const user = await repo.cadastroUser({ email, senha: senhaHash });
        return user;
    }

    async resetSenha(token: string, senha: string) {
        if (!token) {
            throw new Error('Token não informado');
        }

        const tokenDb = await repo.findToken(token);

        if (!tokenDb) {
            throw new Error('Token inválido');
        }

        if (tokenDb.expiresAt < new Date()) {
            throw new Error('Token expirado');
        }

        const senhaHash = await bcrypt.hash(senha, 10);
        const user = await repo.senhaReset(tokenDb.userId, senhaHash);
        await repo.deleteToken(token);

        return user;
    }

    async tokenReset(email: string) {
        const user = await repo.findByEmail(email);

        if (!user) throw new Error('Email não encontrado.');
        const tok = crypto.randomBytes(20).toString('hex');
        const dataValidade = new Date(Date.now() + 1000 * 60 * 30);
        await repo.deleteAllTokens(user.id);

        await repo.tokenReset({
            userId: user.id,
            token: tok,
            expiresAt: dataValidade,
        });

        const link = `http://localhost:5173/resetsenha?token=${tok}`;

        await transporter.sendMail({
            from: '"Suporte" <seuemail@gmail.com>',
            to: email,
            subject: 'Recuperação de senha',
            html: `
            <h1>Pabens ganho celolar</h1>
            <p>clique pra ganhar celolar</p>
            <a href="${link}">${link}</a>
        `,
        });
        return tok;
    }
}
