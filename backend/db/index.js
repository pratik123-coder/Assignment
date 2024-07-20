import { PrismaClient } from "@prisma/client";

let prisma;

if (process.env.NODE_ENV !== 'production') {
  if (!globalThis.prisma) {
    globalThis.prisma = new PrismaClient();
  }
  prisma = globalThis.prisma;
} else {
  prisma = new PrismaClient();
}

export const db = prisma;
