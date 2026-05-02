import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authToken } from '../middlewares/auth.middleware';

const router = Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.get('/protegida', authToken, (req, res) => {
    res.json({ message: 'Rota protegida Acessada' });
});
router.post('/cadastro', authController.cadastro);
router.put('/reset', authController.resetSenha);
router.post('/tokenreset', authController.tokenReset)

export default router;
