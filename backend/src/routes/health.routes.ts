import { Router } from 'express';

const router = Router();

// TODO: 实现健康管理路由
// GET /health/pets/:petId/records - 获取健康记录列表
// POST /health/pets/:petId/records - 创建健康记录
// GET /health/pets/:petId/vaccinations - 获取疫苗接种记录
// POST /health/pets/:petId/vaccinations - 添加疫苗接种记录
// GET /health/pets/:petId/dewormings - 获取驱虫记录
// POST /health/pets/:petId/dewormings - 添加驱虫记录
// GET /health/pets/:petId/weight - 获取体重趋势

router.get('/pets/:petId/records', (req, res) => {
  res.json({ code: 0, message: '获取健康记录', data: { list: [] } });
});

export default router;
