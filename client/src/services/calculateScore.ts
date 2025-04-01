const roundToHalfDecimal = (num: number) => {
  return Math.round(num * 2) / 2;
};

export const calculateScore = (difficulty: string, correctAnswers: number) => {
  let basePoints = 0;
  let bonusMultiplier = 1;

  switch (difficulty) {
    case 'easy':
      basePoints = 1;
      bonusMultiplier = 1.2;
      break;
    case 'medium':
      basePoints = 2;
      bonusMultiplier = 1.35;
      break;
    case 'hard':
      basePoints = 3;
      bonusMultiplier = 1.5;
      break;
    default:
      throw new Error('Invalid difficulty level');
  }

  let score = correctAnswers * basePoints;

  if (correctAnswers === 7) {
    score *= bonusMultiplier;
  }

  return roundToHalfDecimal(score);
};
