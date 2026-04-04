import { Router } from 'express';

const router = Router();

// TODO: 实现社交功能路由
// GET /social/feed - 获取动态流
// POST /social/posts - 发布动态
// GET /social/posts/:id - 获取动态详情
// PUT /social/posts/:id - 更新动态
// DELETE /social/posts/:id - 删除动态
// POST /social/posts/:id/like - 点赞
// DELETE /social/posts/:id/like - 取消点赞
// GET /social/posts/:id/comments - 获取评论
// POST /social/posts/:id/comments - 发表评论
// DELETE /social/comments/:id - 删除评论
// POST /social/users/:id/follow - 关注
// DELETE /social/users/:id/follow - 取消关注

router.get('/feed', (req, res) => {
  res.json({ code: 0, message: '获取动态流', data: { list: [] } });
});

export default router;
