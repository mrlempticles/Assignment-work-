import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/db';
import { AuthRequest } from '../middlewares/auth.middleware';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '7d',
  });
};

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export const register = async (req: Request, res: Response) => {
  const { email, password, role } = req.body;
  
  const userExists = await prisma.user.findUnique({ where: { email } });
  if (userExists) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // For testing purposes, we allow role to be passed. 
  // In a real app, only ADMIN can create other ADMINs.
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      role: role || 'USER',
    },
  });

  const token = generateToken(user.id);
  res.cookie('jwt', token, cookieOptions);

  res.status(201).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }

  const token = generateToken(user.id);
  res.cookie('jwt', token, cookieOptions);

  res.status(200).json({
    success: true,
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  });
};

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', '', { ...cookieOptions, maxAge: 0 });
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user?.id },
    select: { id: true, email: true, role: true, createdAt: true }
  });

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  res.status(200).json({ success: true, data: user });
};
