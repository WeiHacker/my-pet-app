import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(
    public code: number,
    public message: string,
    public statusCode: number = 400,
    public errors?: any[]
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = '未授权') {
    super(40100, message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = '权限不足') {
    super(40300, message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = '资源不存在') {
    super(40400, message, 404);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = '参数错误', errors?: any[]) {
    super(40000, message, 400, errors);
  }
}

export function errorHandler(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('Error:', err);

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      code: err.code,
      message: err.message,
      errors: err.errors
    });
    return;
  }

  // 处理其他错误
  res.status(500).json({
    code: 50000,
    message: process.env.NODE_ENV === 'production' ? '服务器内部错误' : err.message
  });
}
