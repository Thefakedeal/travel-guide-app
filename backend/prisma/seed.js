const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      password: await bcrypt.hash('password',10)
    },
  })

  const visitor = await prisma.user.upsert({
    where: { email: 'visitor@visitor.com' },
    update: {},
    create: {
      email: 'visitor@visitor.com',
      name: 'VISITOR',
      password: await bcrypt.hash('password',10)
    },
  })

  const guide = await prisma.user.upsert({
    where: { email: 'guide@guide.com' },
    update: {},
    create: {
      email: 'guide@guide.com',
      name: 'GUIDE',
      password: await bcrypt.hash('password',10)
    },
  })
  
  console.log({ admin,visitor,guide })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })