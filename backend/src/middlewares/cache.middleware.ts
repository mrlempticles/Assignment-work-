import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';

// Cache for 5 minutes
export const cache = new NodeCache({ stdTTL: 300 });

export const cacheMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.method !== 'GET') {
    return next();
  }
  
  // Use URL as key
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);
  
  if (cachedResponse) {
    return res.status(200).json(cachedResponse);
  } else {
    // Hack to intercept res.json and save it in cache
    const originalJson = res.json;
    res.json = (body: any) => {
      // Only cache success responses
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cache.set(key, body);
      }
      return originalJson.call(res, body);
    };
    next();
  }
};
