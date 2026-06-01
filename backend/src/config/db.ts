import { PrismaClient } from '@prisma/client';

import path from 'path';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.join(__dirname, '../../prisma/dev.db')}`
    }
  }
});

export default prisma;
