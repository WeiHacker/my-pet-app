import { Router } from 'express';
import { Router as ExpressRouter } from 'express';

const router: ExpressRouter = Router();

// TODO: 实现用户相关路由
// GET /users/me - 获取当前用户信息
// PUT /users/me - 更新用户信息
// PUT /users/me/password - 修改密码
// GET /users/:id - 获取用户公开信息
// GET /users/:id/pets - 获取用户的宠物列表

router.get('/me', (req, res) => {
  res.json({ code: 0, message: '获取用户信息', data: null });
});

export default router;
