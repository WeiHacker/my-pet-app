import { Router } from 'express';
import { authMiddleware, AuthRequest } from '../middlewares/auth';
import { query, queryOne } from '../config/database';
import { Pet, PetType } from '../types';

const router = Router();

// 获取宠物类型列表
router.get('/types', async (req, res, next) => {
  try {
    const types = await query<PetType>(
      'SELECT * FROM pet_types ORDER BY sort_order'
    );
    res.json({ code: 0, data: types });
  } catch (error) {
    next(error);
  }
});

// 获取当前用户的宠物列表
router.get('/', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const pets = await query<Pet>(
      `SELECT p.*, pt.name as type_name, pt.category as type_category
       FROM pets p
       LEFT JOIN pet_types pt ON p.type_id = pt.id
       WHERE p.user_id = ? AND p.deleted_at IS NULL
       ORDER BY p.created_at DESC`,
      [req.userId]
    );
    res.json({ code: 0, data: { list: pets, total: pets.length } });
  } catch (error) {
    next(error);
  }
});

// 创建宠物
router.post('/', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const { name, typeId, breed, gender, birthday, adoptionDate, weight, color, bio, tags, isPublic } = req.body;

    if (!name || !typeId) {
      return res.status(400).json({ code: 40000, message: '宠物名称和类型不能为空' });
    }

    const result = await query<any>(
      `INSERT INTO pets (user_id, name, type_id, breed, gender, birthday, adoption_date, weight, color, bio, tags, is_public)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.userId, name, typeId, breed || null, gender || null, birthday || null,
       adoptionDate || null, weight || null, color || null, bio || null,
       tags ? JSON.stringify(tags) : null, isPublic !== false ? 1 : 0]
    );

    const pet = await queryOne<Pet>('SELECT * FROM pets WHERE id = ?', [result.insertId]);

    res.status(201).json({ code: 0, message: '创建成功', data: pet });
  } catch (error) {
    next(error);
  }
});

// 获取宠物详情
router.get('/:id', async (req, res, next) => {
  try {
    const pet = await queryOne<Pet>(
      `SELECT p.*, pt.name as type_name, pt.category as type_category
       FROM pets p
       LEFT JOIN pet_types pt ON p.type_id = pt.id
       WHERE p.id = ? AND p.deleted_at IS NULL`,
      [req.params.id]
    );

    if (!pet) {
      return res.status(404).json({ code: 40400, message: '宠物不存在' });
    }

    res.json({ code: 0, data: pet });
  } catch (error) {
    next(error);
  }
});

// 更新宠物信息
router.put('/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const pet = await queryOne<Pet>(
      'SELECT * FROM pets WHERE id = ? AND deleted_at IS NULL',
      [req.params.id]
    );

    if (!pet) {
      return res.status(404).json({ code: 40400, message: '宠物不存在' });
    }

    if (pet.user_id !== req.userId) {
      return res.status(403).json({ code: 40300, message: '无权限修改' });
    }

    const { name, typeId, breed, gender, birthday, adoptionDate, weight, color, bio, tags, isPublic } = req.body;

    await query(
      `UPDATE pets SET
       name = COALESCE(?, name),
       type_id = COALESCE(?, type_id),
       breed = COALESCE(?, breed),
       gender = COALESCE(?, gender),
       birthday = COALESCE(?, birthday),
       adoption_date = COALESCE(?, adoption_date),
       weight = COALESCE(?, weight),
       color = COALESCE(?, color),
       bio = COALESCE(?, bio),
       tags = COALESCE(?, tags),
       is_public = COALESCE(?, is_public),
       updated_at = NOW()
       WHERE id = ?`,
      [name, typeId, breed, gender, birthday, adoptionDate, weight, color, bio,
       tags ? JSON.stringify(tags) : null, isPublic, req.params.id]
    );

    const updated = await queryOne<Pet>('SELECT * FROM pets WHERE id = ?', [req.params.id]);
    res.json({ code: 0, message: '更新成功', data: updated });
  } catch (error) {
    next(error);
  }
});

// 删除宠物
router.delete('/:id', authMiddleware, async (req: AuthRequest, res, next) => {
  try {
    const pet = await queryOne<Pet>(
      'SELECT * FROM pets WHERE id = ? AND deleted_at IS NULL',
      [req.params.id]
    );

    if (!pet) {
      return res.status(404).json({ code: 40400, message: '宠物不存在' });
    }

    if (pet.user_id !== req.userId) {
      return res.status(403).json({ code: 40300, message: '无权限删除' });
    }

    await query('UPDATE pets SET deleted_at = NOW() WHERE id = ?', [req.params.id]);
    res.json({ code: 0, message: '删除成功' });
  } catch (error) {
    next(error);
  }
});

export default router;
