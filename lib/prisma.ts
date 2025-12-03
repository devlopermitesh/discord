// lib/prisma.ts
import 'server-only' // Server-side only (Next.js 15+ ke liye)
import { PrismaNeon } from '@prisma/adapter-neon' // Neon adapter
import { PrismaClient } from './generated/prisma/client'
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
