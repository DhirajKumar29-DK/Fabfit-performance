import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  admin?: {
    adminId: string;
    role: string;
  };
}

export const authenticateAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.admin_token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token missing.',
      });
    }
    const secret = process.env.JWT_SECRET;
    
    if (!secret) {
      console.error('JWT_SECRET is not defined');
      return res.status(500).json({
        success: false,
        message: 'Internal server error.',
      });
    }

    const decoded = jwt.verify(token, secret) as { adminId: string; role: string };
    
    if (!decoded.adminId || decoded.role !== 'ADMIN') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token payload.',
      });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token expired or invalid.',
    });
  }
};
