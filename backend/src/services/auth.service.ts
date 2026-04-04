import { query, queryOne } from '../config/database';
import { User, SafeUser } from '../types';
import { hashPassword, comparePassword } from '../utils/password';
import { generateTokens } from '../utils/jwt';
import { BadRequestError, UnauthorizedError } from '../middlewares/errorHandler';

function toSafeUser(user: User): SafeUser {
  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    nickname: user.nickname,
    avatar: user.avatar,
    bio: user.bio,
    created_at: user.created_at
  };
}

export class AuthService {
  async register(data: {
    email: string;
    password: string;
    nickname: string;
    phone?: string;
  }) {
    // 检查邮箱是否已注册
    const existing = await queryOne<User>(
      'SELECT id FROM users WHERE email = ?',
      [data.email]
    );

    if (existing) {
      throw new BadRequestError('邮箱已被注册');
    }

    // 检查手机号
    if (data.phone) {
      const existingPhone = await queryOne<User>(
        'SELECT id FROM users WHERE phone = ?',
        [data.phone]
      );
      if (existingPhone) {
        throw new BadRequestError('手机号已被注册');
      }
    }

    // 密码加密
    const passwordHash = await hashPassword(data.password);

    // 创建用户
    const result = await query<any>(
      `INSERT INTO users (email, phone, password_hash, nickname) VALUES (?, ?, ?, ?)`,
      [data.email, data.phone || null, passwordHash, data.nickname]
    );

    const user = await queryOne<User>(
      'SELECT * FROM users WHERE id = ?',
      [result.insertId]
    );

    if (!user) {
      throw new BadRequestError('用户创建失败');
    }

    const tokens = generateTokens(user.id);

    return {
      user: toSafeUser(user),
      tokens
    };
  }

  async login(account: string, password: string) {
    // 支持邮箱或手机号登录
    const user = await queryOne<User>(
      'SELECT * FROM users WHERE (email = ? OR phone = ?) AND deleted_at IS NULL',
      [account, account]
    );

    if (!user) {
      throw new UnauthorizedError('账号或密码错误');
    }

    if (user.status !== 1) {
      throw new UnauthorizedError('账号已被禁用');
    }

    const isValid = await comparePassword(password, user.password_hash);
    if (!isValid) {
      throw new UnauthorizedError('账号或密码错误');
    }

    const tokens = generateTokens(user.id);

    return {
      user: toSafeUser(user),
      tokens
    };
  }

  async refresh(refreshToken: string) {
    const { verifyRefreshToken } = await import('../utils/jwt');
    const payload = verifyRefreshToken(refreshToken);

    const user = await queryOne<User>(
      'SELECT * FROM users WHERE id = ? AND status = 1 AND deleted_at IS NULL',
      [payload.userId]
    );

    if (!user) {
      throw new UnauthorizedError('用户不存在或已被禁用');
    }

    return generateTokens(user.id);
  }

  async getUserById(userId: number): Promise<SafeUser | null> {
    const user = await queryOne<User>(
      'SELECT * FROM users WHERE id = ? AND deleted_at IS NULL',
      [userId]
    );

    return user ? toSafeUser(user) : null;
  }
}

export default new AuthService();
