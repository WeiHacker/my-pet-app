import { Router } from 'express';

const router = Router();

// TODO: 实现提醒路由
// GET /reminders - 获取提醒列表
// POST /reminders - 创建提醒
// PUT /reminders/:id - 更新提醒
// PUT /reminders/:id/complete - 完成提醒
// DELETE /reminders/:id - 删除提醒

router.get('/', (req, res) => {
  res.json({ code: 0, message: '获取提醒列表', data: { list: [] } });
});

export default router;
