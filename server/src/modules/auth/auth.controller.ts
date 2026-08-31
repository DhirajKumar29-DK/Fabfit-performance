import { Request, Response, NextFunction } from 'express';
import { loginAdmin } from './auth.service';
import { sendSuccess, sendError } from '../../utils/response';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const { token } = await loginAdmin(email, password);
    
    // Set httpOnly cookie
    res.cookie('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    sendSuccess(res, 200, 'Login successful', { authenticated: true });
  } catch (error: any) {
    if (error.message === 'Invalid email or password.') {
      sendError(res, 401, error.message);
    } else {
      next(error);
    }
  }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('admin_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/'
    });
    sendSuccess(res, 200, 'Logout successful', { authenticated: false });
  } catch (error) {
    next(error);
  }
};
