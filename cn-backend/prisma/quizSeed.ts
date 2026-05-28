import { PrismaClient } from '@prisma/client';

const prisma =
  new PrismaClient();

async function main() {
  await prisma.quiz.createMany({
    data: [
      {
        question:
          'What does HTTP stand for?',
        options: [
          'Hyper Text Transfer Protocol',
          'High Text Transfer Protocol',
          'Hyper Tool Transfer Protocol',
          'Home Transfer Protocol',
        ],
        correctAns:
          'Hyper Text Transfer Protocol',
        module:
          'Application Layer',
      },

      {
        question:
          'Which layer handles routing?',
        options: [
          'Network Layer',
          'Physical Layer',
          'Session Layer',
          'Presentation Layer',
        ],
        correctAns:
          'Network Layer',
        module:
          'OSI Model',
      },

      {
        question:
          'TCP is?',
        options: [
          'Connection Oriented',
          'Connectionless',
          'Wireless Protocol',
          'Routing Device',
        ],
        correctAns:
          'Connection Oriented',
        module:
          'Transport Layer',
      },
    ],
  });

  console.log(
    'Quiz seeded'
  );
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });