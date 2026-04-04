import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import petRoutes from './routes/pet.routes';
import healthRoutes from './routes/health.routes';
import reminderRoutes from './routes/reminder.routes';
import socialRoutes from './routes/social.routes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app = express();

// 中间件
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件
app.use('/uploads', express.static('uploads'));

// API 路由
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/reminders', reminderRoutes);
app.use('/api/v1/social', socialRoutes);

// 健康检查
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 根路径
app.get('/', (req, res) => {
  res.json({
    name: '宠物管理系统 API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      pets: '/api/v1/pets',
      health: '/api/v1/health',
      reminders: '/api/v1/reminders',
      social: '/api/v1/social'
    },
    health: '/api/v1/health'
  });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ code: 40400, message: '接口不存在' });
});

// 错误处理
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 服务器运行在 http://localhost:${PORT}`);
  console.log(`📝 API 文档: http://localhost:${PORT}/api/v1/health`);
});

export default app;
