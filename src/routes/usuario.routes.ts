import { Router } from 'express';
import { UsuarioController } from '../controllers/usuario.controller';

const router = Router();
const controller = new UsuarioController();

router.post('/usuario', (req, res) => controller.criar(req, res));
router.get('/usuario', (req, res) => controller.listar(req, res));
router.put('/usuario/:id', (req, res) => controller.atualizar(req, res));
router.delete('/usuario/:id', (req, res) => controller.deletar(req, res));

export default router;
