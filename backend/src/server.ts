import app from './app';
import { PrismaClient } from '@prisma/client';

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

const startServer = async () => {
  try {
    await prisma.$connect();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Error starting server:', err);
    await prisma.$disconnect();
    process.exit(1);
  }
};


startServer();