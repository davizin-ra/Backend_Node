import app from './app.js';
import { prisma } from './prisma/client.js';

app.listen(3000, async () => {
    console.log('Servidor Rodando na porta: 3000');

    try {
        await prisma.$connect();
        console.log('\nDatabase conectada com sucesso!!.');
    } catch {
        console.error('\nDatabase não conectado.');
    }
});
