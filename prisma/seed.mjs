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

  const usersData = [
    { username: "test1", email: "test1@test.ch" },
    { username: "test2", email: "test2@test.ch" },
    { username: "test3", email: "test3@test.ch" },
  ];

  const users = await Promise.all(
    usersData.map(user => prisma.user.create({ data: user }))
  );

  // Seed Transactions
  const transactionsData = users.flatMap(user =>
    data.map(token => ({
      userId: user.id,
      tokenId: token.id,
      amount: Math.random() * 10 + 1,
      priceAtTransaction: token.price,
      transactionType: "buy",
    }))
  );

  await Promise.all(
    transactionsData.map(transaction => prisma.transaction.create({ data: transaction }))
  );

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