# My Pet App - 宠物管理系统

一个全栈宠物管理 Web 应用，帮助宠物主人记录和管理爱宠的日常生活。

## 技术栈

- **前端**: Vue 3 + TypeScript + Vite + Element Plus
- **后端**: Node.js + Express + TypeScript
- **数据库**: MySQL 8.0
- **认证**: JWT

## 功能模块

- 用户系统（注册/登录）
- 宠物档案管理
- 健康管理（疫苗/驱虫/体检）
- 日常提醒
- 社交功能

## 快速开始

### 环境要求

- Node.js 18+
- MySQL 8.0+
- Redis (可选)

### 数据库初始化

```bash
# 创建数据库和表
mysql -u root -p < database/init.sql
```

### 后端启动

```bash
cd backend

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env
# 编辑 .env 文件，配置数据库连接信息

# 开发模式启动
npm run dev
```

后端服务将运行在 http://localhost:3000

### 前端启动

```bash
cd frontend

# 安装依赖
npm install

# 开发模式启动
npm run dev
```

前端服务将运行在 http://localhost:5173

## 项目结构

```
my-pet-app/
├── backend/                 # 后端代码
│   ├── src/
│   │   ├── config/         # 配置
│   │   ├── controllers/    # 控制器
│   │   ├── middlewares/    # 中间件
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由
│   │   ├── services/       # 业务逻辑
│   │   ├── types/          # 类型定义
│   │   ├── utils/          # 工具函数
│   │   └── app.ts          # 入口
│   └── package.json
│
├── frontend/               # 前端代码
│   ├── src/
│   │   ├── api/           # API 请求
│   │   ├── assets/        # 静态资源
│   │   ├── components/    # 组件
│   │   ├── layouts/       # 布局
│   │   ├── router/        # 路由
│   │   ├── stores/        # 状态管理
│   │   ├── types/         # 类型定义
│   │   ├── utils/         # 工具函数
│   │   └── views/         # 页面
│   └── package.json
│
├── database/              # 数据库
│   └── init.sql          # 初始化脚本
│
└── README.md
```

## API 文档

### 认证接口

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | /api/v1/auth/register | 用户注册 |
| POST | /api/v1/auth/login | 用户登录 |
| POST | /api/v1/auth/logout | 用户登出 |
| POST | /api/v1/auth/refresh | 刷新 Token |

### 宠物接口

| 方法 | 路径 | 描述 |
|------|------|------|
| GET | /api/v1/pets/types | 获取宠物类型列表 |
| GET | /api/v1/pets | 获取宠物列表 |
| POST | /api/v1/pets | 创建宠物 |
| GET | /api/v1/pets/:id | 获取宠物详情 |
| PUT | /api/v1/pets/:id | 更新宠物信息 |
| DELETE | /api/v1/pets/:id | 删除宠物 |

## 开发计划

- [ ] 健康管理模块完善
- [ ] 提醒功能实现
- [ ] 社交功能实现
- [ ] 图片上传功能
- [ ] 单元测试
- [ ] Docker 部署

## License

MIT
