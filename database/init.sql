-- 设置字符集
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- 创建数据库
CREATE DATABASE IF NOT EXISTS my_pet_app DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE my_pet_app;

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  email           VARCHAR(100) UNIQUE NOT NULL,
  phone           VARCHAR(20) UNIQUE,
  password_hash   VARCHAR(255) NOT NULL,
  nickname        VARCHAR(50) NOT NULL,
  avatar          VARCHAR(500),
  bio             VARCHAR(500),
  status          TINYINT DEFAULT 1 COMMENT '1: 正常, 0: 禁用',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at      DATETIME DEFAULT NULL,

  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 宠物类型表
CREATE TABLE IF NOT EXISTS pet_types (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  name            VARCHAR(50) NOT NULL,
  category        VARCHAR(50) NOT NULL COMMENT 'common: 常见宠物, small: 小宠, reptile: 爬宠, custom: 自定义',
  icon            VARCHAR(100),
  sort_order      INT DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 初始化宠物类型数据
INSERT INTO pet_types (name, category, icon, sort_order) VALUES
('猫', 'common', 'cat', 1),
('狗', 'common', 'dog', 2),
('仓鼠', 'small', 'hamster', 3),
('兔子', 'small', 'rabbit', 4),
('鸟', 'small', 'bird', 5),
('鱼', 'small', 'fish', 6),
('蜥蜴', 'reptile', 'lizard', 7),
('乌龟', 'reptile', 'turtle', 8),
('蛇', 'reptile', 'snake', 9);

-- 宠物表
CREATE TABLE IF NOT EXISTS pets (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id         BIGINT NOT NULL,
  name            VARCHAR(50) NOT NULL,
  type_id         INT NOT NULL,
  breed           VARCHAR(100) COMMENT '品种',
  gender          TINYINT COMMENT '0: 未知, 1: 公, 2: 母',
  birthday        DATE,
  adoption_date   DATE COMMENT '领养日期',
  weight          DECIMAL(5,2) COMMENT '体重(kg)',
  color           VARCHAR(50) COMMENT '毛色',
  avatar          VARCHAR(500) COMMENT '头像',
  bio             VARCHAR(500) COMMENT '简介',
  tags            JSON COMMENT '标签数组',
  is_public       TINYINT DEFAULT 1 COMMENT '是否公开',
  status          TINYINT DEFAULT 1 COMMENT '1: 正常, 0: 已离世',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at      DATETIME DEFAULT NULL,

  INDEX idx_user_id (user_id),
  INDEX idx_type_id (type_id),
  INDEX idx_is_public (is_public),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (type_id) REFERENCES pet_types(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 宠物照片表
CREATE TABLE IF NOT EXISTS pet_photos (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  pet_id          BIGINT NOT NULL,
  url             VARCHAR(500) NOT NULL,
  caption         VARCHAR(200),
  is_avatar       TINYINT DEFAULT 0,
  sort_order      INT DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_pet_id (pet_id),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 疫苗记录表
CREATE TABLE IF NOT EXISTS vaccinations (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  pet_id          BIGINT NOT NULL,
  vaccine_name    VARCHAR(100) NOT NULL COMMENT '疫苗名称',
  vaccine_type    VARCHAR(50) COMMENT '疫苗类型: 狂犬、猫三联等',
  vaccination_date DATE NOT NULL,
  next_date       DATE COMMENT '下次接种日期',
  hospital        VARCHAR(200) COMMENT '接种医院',
  notes           TEXT,
  certificate_url VARCHAR(500) COMMENT '接种证明',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_pet_id (pet_id),
  INDEX idx_next_date (next_date),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 驱虫记录表
CREATE TABLE IF NOT EXISTS deworming_records (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  pet_id          BIGINT NOT NULL,
  deworming_type  VARCHAR(50) NOT NULL COMMENT '体内/体外',
  product_name    VARCHAR(100) COMMENT '药品名称',
  deworming_date  DATE NOT NULL,
  next_date       DATE COMMENT '下次驱虫日期',
  notes           TEXT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,

  INDEX idx_pet_id (pet_id),
  INDEX idx_next_date (next_date),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 健康记录表
CREATE TABLE IF NOT EXISTS health_records (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  pet_id          BIGINT NOT NULL,
  record_type     VARCHAR(50) NOT NULL COMMENT '体检/用药/体重/疾病',
  record_date     DATE NOT NULL,
  title           VARCHAR(200),
  content         TEXT,
  weight          DECIMAL(5,2) COMMENT '体重记录',
  hospital        VARCHAR(200),
  attachments     JSON COMMENT '附件列表',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_pet_id (pet_id),
  INDEX idx_record_type (record_type),
  INDEX idx_record_date (record_date),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 提醒表
CREATE TABLE IF NOT EXISTS reminders (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id         BIGINT NOT NULL,
  pet_id          BIGINT,
  reminder_type   VARCHAR(50) NOT NULL COMMENT '喂食/遛狗/清洁/用药/预约/其他',
  title           VARCHAR(200) NOT NULL,
  content         TEXT,
  remind_time     DATETIME NOT NULL,
  repeat_type     VARCHAR(20) DEFAULT 'none' COMMENT 'none/daily/weekly/monthly/yearly',
  repeat_config   JSON COMMENT '重复配置',
  is_completed    TINYINT DEFAULT 0,
  completed_at    DATETIME,
  is_notified     TINYINT DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_user_id (user_id),
  INDEX idx_pet_id (pet_id),
  INDEX idx_remind_time (remind_time),
  INDEX idx_is_completed (is_completed),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 动态/帖子表
CREATE TABLE IF NOT EXISTS posts (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id         BIGINT NOT NULL,
  pet_id          BIGINT,
  content         TEXT NOT NULL,
  images          JSON COMMENT '图片列表',
  tags            JSON COMMENT '话题标签',
  visibility      TINYINT DEFAULT 1 COMMENT '1: 公开, 2: 仅关注可见, 3: 私密',
  like_count      INT DEFAULT 0,
  comment_count   INT DEFAULT 0,
  is_pinned       TINYINT DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at      DATETIME DEFAULT NULL,

  INDEX idx_user_id (user_id),
  INDEX idx_pet_id (pet_id),
  INDEX idx_created_at (created_at),
  INDEX idx_visibility (visibility),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 评论表
CREATE TABLE IF NOT EXISTS comments (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  post_id         BIGINT NOT NULL,
  user_id         BIGINT NOT NULL,
  parent_id       BIGINT COMMENT '父评论ID (回复)',
  reply_to_user_id BIGINT COMMENT '回复的用户',
  content         VARCHAR(500) NOT NULL,
  like_count      INT DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at      DATETIME DEFAULT NULL,

  INDEX idx_post_id (post_id),
  INDEX idx_user_id (user_id),
  INDEX idx_parent_id (parent_id),
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 点赞表
CREATE TABLE IF NOT EXISTS likes (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id         BIGINT NOT NULL,
  target_type     VARCHAR(20) NOT NULL COMMENT 'post/comment',
  target_id       BIGINT NOT NULL,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uk_user_target (user_id, target_type, target_id),
  INDEX idx_target (target_type, target_id),
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 关注关系表
CREATE TABLE IF NOT EXISTS followers (
  id              BIGINT PRIMARY KEY AUTO_INCREMENT,
  follower_id     BIGINT NOT NULL COMMENT '关注者',
  following_id    BIGINT NOT NULL COMMENT '被关注者',
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,

  UNIQUE KEY uk_follow (follower_id, following_id),
  INDEX idx_following_id (following_id),
  FOREIGN KEY (follower_id) REFERENCES users(id),
  FOREIGN KEY (following_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
