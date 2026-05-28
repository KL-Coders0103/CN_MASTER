import prisma from '../config/db';

export const getQuizService =
  async () => {
    const quizzes =
      await prisma.quiz.findMany({
        orderBy: {
          createdAt:
            'desc',
        },
      });

    return quizzes;
  };

export const submitQuizService =
  async (
    userId: string,
    score: number
  ) => {
    const xpReward =
      score * 10;

    const user =
      await prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          xp: {
            increment:
              xpReward,
          },

          quizCompleted: {
            increment: 1,
          },
        },
      });

    return {
      user,
      xpReward,
    };
  };