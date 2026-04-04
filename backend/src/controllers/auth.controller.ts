import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth.service';
import { BadRequestError } from '../middlewares/errorHandler';

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password, nickname, phone } = req.body;

      if (!email || !password || !nickname) {
        throw new BadRequestError('邮箱、密码和昵称不能为空');
      }

      if (password.length < 8) {
        throw new BadRequestError('密码至少需要8位');
      }

      const result = await authService.register({
        email,
        password,
        nickname,
        phone
      });

      res.status(201).json({
        code: 0,
        message: '注册成功',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { account, password } = req.body;

      if (!account || !password) {
        throw new BadRequestError('账号和密码不能为空');
      }

      const result = await authService.login(account, password);

      res.json({
        code: 0,
        message: '登录成功',
        data: result
      });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        throw new BadRequestError('刷新令牌不能为空');
      }

      const tokens = await authService.refresh(refreshToken);

      res.json({
        code: 0,
        message: '刷新成功',
        data: tokens
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      // JWT 无状态，服务端不需要特殊处理
      // 如果需要实现 token 黑名单，可以在这里添加逻辑

      res.json({
        code: 0,
        message: '退出成功'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
