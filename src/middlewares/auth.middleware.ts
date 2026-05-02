import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: any;
}

export function authToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.json("Acesso não autorizado.");

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.json("Token inválido.");

    req.user = user;
    next();
  });
}