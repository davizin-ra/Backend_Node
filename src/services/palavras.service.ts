import { genSalt } from 'bcrypt';
import { PalavrasRepository } from '../repositories/palavras.repository.js';

const repo = new PalavrasRepository();

export class PalavrasService {
    async criarSubstantivo(
        plural: boolean,
        genero: boolean,
        conteudo: string,
        significado: string,
        generoData?: {
            regra: string;
            elemento: string;
            separado: string;
            conteudoM: string;
            conteudoF: string;
        }
    ) {
        if (genero) {
            conteudo = 'Flexão de gênero ativa';
        }
        const substantivo = await repo.criarSubstantivo({
            plural,
            genero,
            conteudo,
            significado,
        });
        if (genero) {
            if (!generoData) {
                throw new Error('Informe os dados do gênero');
            }
            await repo.criarGenero({
                tipo: 'substantivo',
                itemId: substantivo.id,
                regra: generoData.regra,
                elemento: generoData.elemento,
                separado: generoData.separado,
                conteudoM: generoData.conteudoM,
                conteudoF: generoData.conteudoF,
            });
        }

        return substantivo;
    }

    // find

    async findSubstantivo(id: string) {
        const substantivo = await repo.findSubstantivo(id);
        if (substantivo.genero) {
            const genero = await repo.findGenero('substantivo', substantivo.id);
            return { substantivo, genero };
        }
        return substantivo;
    }
}
