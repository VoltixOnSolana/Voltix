import { PrismaClient } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();
const data = JSON.parse(fs.readFileSync('data/data.json', 'utf-8'));

async function main() {
  console.log('Seeding database...');
  
  for (const token of data) {
    await prisma.token.create({
      data: token,
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });