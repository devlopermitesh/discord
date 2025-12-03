import { prisma } from '@/lib/prisma'

async function main() {
  await prisma.user.create({
    data: { name: 'Test User', email: 'test@example.com' },
  })
}
main().finally(async () => await prisma.$disconnect())
