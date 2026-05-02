import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authToken } from '../middlewares/auth.middleware';

const router = Router();
const controller = new AuthController();

router.post('/login', controller.login);
router.get('/protegida', authToken, (req, res) => {
  res.json({ message: 'Rota protegida Acessada' });
});

export default router;