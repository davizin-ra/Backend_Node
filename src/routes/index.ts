import { Router } from 'express';
import { AuthController, GruposController } from '../controllers/index.js';
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();
const authController = new AuthController();
const gruposController = new GruposController();

// auth

router.post('/login', authController.login);
router.get('/protegida', authToken, (req, res) => {
    res.json({ message: 'Rota protegida Acessada' });
});
router.post('/cadastro', authController.cadastro);
router.put('/reset', authController.resetSenha);
router.post('/tokenreset', authController.tokenReset);

// grupos

router.post('/grupo', gruposController.criarGrupo);
router.get('/grupo', gruposController.acharGrupo);
router.get('/membros', gruposController.acharMembros);
router.put('/sair', gruposController.sairGrupo);
router.put('/atribuir', gruposController.atribuirGrupo);

export default router;
