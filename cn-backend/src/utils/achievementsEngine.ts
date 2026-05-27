interface Achievement {
  id: string;
  title: string;
  unlocked: boolean;
}

interface AchievementInput {
  xp: number;
  streak: number;
  quizCompleted: number;
}

export const getAchievements =
  ({
    xp,
    streak,
    quizCompleted,
  }: AchievementInput):
    Achievement[] => {
    return [
      {
        id:
          'beginner_explorer',
        title:
          'Beginner Explorer',
        unlocked:
          xp >= 10,
      },

      {
        id:
          'consistency_flame',
        title:
          'Consistency Flame',
        unlocked:
          streak >= 3,
      },

      {
        id:
          'quiz_challenger',
        title:
          'Quiz Challenger',
        unlocked:
          quizCompleted >= 1,
      },
    ];
  };