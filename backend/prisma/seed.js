const { PrismaClient } = require('@prisma/client')
const { faker } = require('@faker-js/faker');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      email: 'admin@admin.com',
      name: 'Admin',
      role: "ADMIN",
      password: await bcrypt.hash('password',10)
    },
  })

  const visitor = await prisma.user.upsert({
    where: { email: 'visitor@visitor.com' },
    update: {},
    create: {
      email: 'visitor@visitor.com',
      name: 'Visitor',
      role:"VISITOR",
      password: await bcrypt.hash('password',10)
    },
  })

  const guide = await prisma.user.upsert({
    where: { email: 'guide@guide.com' },
    update: {},
    create: {
      email: 'guide@guide.com',
      name: 'Guide',
      role: "GUIDE",
      password: await bcrypt.hash('password',10)
    },
  })
  
  const cities = Array.apply(null, Array(5)).map(function () {

    return {
      name: faker.address.city()
    }
  })

  const city = await prisma.city.createMany({
    data: cities
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