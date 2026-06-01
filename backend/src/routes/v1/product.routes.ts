import { Router } from 'express';
import { z } from 'zod';
import { validate } from '../../middlewares/validate.middleware';
import { authenticate } from '../../middlewares/auth.middleware';
import { requireAdmin } from '../../middlewares/role.middleware';
import { cacheMiddleware } from '../../middlewares/cache.middleware';
import { 
  getProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../../controllers/product.controller';

const router = Router();

const productSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    description: z.string().min(1, 'Description is required'),
    price: z.union([z.string(), z.number()]).transform(val => Number(val)),
    stock: z.union([z.string(), z.number()]).transform(val => Number(val)),
    imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
});

const productUpdateSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.string(), z.number()]).transform(val => Number(val)).optional(),
    stock: z.union([z.string(), z.number()]).transform(val => Number(val)).optional(),
    imageUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  }),
});

// All authenticated users can read products
router.get('/', authenticate, cacheMiddleware, getProducts);
router.get('/:id', authenticate, getProductById);

// Only Admins can create, update, or delete products
router.post('/', authenticate, requireAdmin, validate(productSchema), createProduct);
router.put('/:id', authenticate, requireAdmin, validate(productUpdateSchema), updateProduct);
router.delete('/:id', authenticate, requireAdmin, deleteProduct);

export default router;
