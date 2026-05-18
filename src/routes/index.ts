import { Router } from 'express';
import {
    AuthController,
    GruposController,
    PalavrasController,
} from '../controllers/index.js';
import { authToken } from '../middlewares/auth.middleware.js';

const router = Router();
const authController = new AuthController();
const gruposController = new GruposController();
const palavrasController = new PalavrasController();

// auth

router.post('/login', authController.login);
router.get('/protegida', authToken, (req, res) => {
    res.json({ success: true });
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

// palavras

router.post('/substantivo', palavrasController.criarSubstantivo);
router.get('/substantivo', palavrasController.findSubstantivo);
router.post('/pronome', palavrasController.criarPronome)

export default router;
