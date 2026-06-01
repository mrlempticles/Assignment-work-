import { Request, Response } from 'express';
import prisma from '../config/db';
import { AuthRequest } from '../middlewares/auth.middleware';
import { cache } from '../middlewares/cache.middleware';

export const getProducts = async (req: Request, res: Response) => {
  const { search } = req.query;

  const whereClause = search
    ? {
        OR: [
          { name: { contains: String(search) } },
          { description: { contains: String(search) } },
        ],
      }
    : {};

  const products = await prisma.product.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
    include: {
      author: { select: { email: true } }
    }
  });
  res.status(200).json({ success: true, data: products });
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      author: { select: { email: true } }
    }
  });

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  res.status(200).json({ success: true, data: product });
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  const { name, description, price, stock, imageUrl } = req.body;
  const authorId = req.user?.id;

  if (!authorId) return res.status(401).json({ success: false, message: 'Unauthorized' });

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock, 10),
      imageUrl: imageUrl || null,
      authorId
    }
  });

  // Clear cache since a new product was added
  cache.flushAll();

  res.status(201).json({ success: true, data: product });
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { name, description, price, stock, imageUrl } = req.body;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(stock && { stock: parseInt(stock, 10) }),
        ...(imageUrl !== undefined && { imageUrl: imageUrl || null })
      }
    });

    // Clear cache
    cache.flushAll();

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.product.delete({ where: { id } });
    
    // Clear cache
    cache.flushAll();

    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    res.status(404).json({ success: false, message: 'Product not found' });
  }
};
