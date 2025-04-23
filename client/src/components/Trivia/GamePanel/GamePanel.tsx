import { useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import classes from './GamePanel.module.scss';
import { useTrivia } from '../../../hooks/useTrivia';
import {
  GameSettingsContext,
  Results,
} from '../../../context/GameSettingsContext';
import Loader from '../../Loader/Loader';
import { shuffleArray } from '../../../services/shuffleArray';
import { calculateScore } from '../../../services/calculateScore';
import { saveGameResult } from '../../../services/api';

interface TriviaQuestion {
  question: string;
  type: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const GamePanel = () => {
  const {
    gameSettings,
    gameStarted,
    setGameStarted,
    setLastGameResult,
    gameOver,
    setGameOver,
    lastGameResult,
  } = useContext(GameSettingsContext);

  const queryClient = useQueryClient();
  const { data, isSuccess, isLoading } = useTrivia(gameSettings, gameStarted);

  const [count, setCount] = useState(0);
  const [currentResult, setCurrentResult] = useState<Results | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOutcome, setGameOutcome] = useState<'win' | 'lose' | null>(null);

  useEffect(() => {
    if (gameStarted) {
      setCurrentResult(null);
      setCount(0);
      setSelectedOption(null);
      setFeedback(null);
      setGameOutcome(null);
      setGameOver(false);
    }
  }, [gameStarted, setGameOver]);

  useEffect(() => {
    if (isSuccess && data && gameStarted) {
      const questions = data.results.map(
        (item: TriviaQuestion, index: number) => ({
          id: index,
          question: item.question,
          options: shuffleArray([
            ...item.incorrect_answers,
            item.correct_answer,
          ]),
          correctAnswer: item.correct_answer,
          userAnswer: '',
          isCorrect: false,
        })
      );
      setCurrentResult({
        username: gameSettings.username,
        date: new Date().toLocaleDateString(),
        category: data.results[0].category.toLowerCase(),
        difficulty: data.results[0].difficulty,
        score: 0,
        questions,
      });
    }
  }, [isSuccess, data, gameSettings.username, gameStarted]);

  useEffect(() => {
    if (gameOver && lastGameResult) {
      saveGameResult(lastGameResult)
        .then(() => console.log('History saved.'))
        .catch((err) => console.error('Save failed:', err));
    }
  }, [gameOver, lastGameResult]);

  const handleSelection = (option: string) => {
    if (!currentResult || selectedOption || gameOver) return;

    setSelectedOption(option);
    const isCorrect = option === currentResult.questions[count].correctAnswer;

    const updatedQuestions = [...currentResult.questions];
    updatedQuestions[count].userAnswer = option;
    updatedQuestions[count].isCorrect = isCorrect;

    let increment = 0;
    switch (currentResult.difficulty) {
      case 'easy':
        increment = isCorrect ? 1 : 0;
        break;
      case 'medium':
        increment = isCorrect ? 2 : 0;
        break;
      case 'hard':
        increment = isCorrect ? 3 : 0;
        break;
    }

    const updatedResult: Results = {
      ...currentResult,
      questions: updatedQuestions,
      score: currentResult.score + increment,
    };

    setCurrentResult(updatedResult);
    setFeedback(isCorrect ? 'Correct answer! ✅' : 'Incorrect answer! ❌');

    setTimeout(() => {
      setFeedback(null);

      if (isCorrect && count < updatedQuestions.length - 1) {
        setSelectedOption(null);
        setCount((c) => c + 1);
      } else {
        setLastGameResult(updatedResult);
        setGameOutcome(isCorrect ? 'win' : 'lose');
        setGameOver(true);
        setGameStarted(false);
      }
    }, 4000);
  };

  const handlePlayAgain = () => {
    queryClient.removeQueries({
      queryKey: ['trivia', gameSettings.difficulty, gameSettings.category],
    });

    setGameStarted(false);
    setTimeout(() => setGameStarted(true), 100);
  };

  if (isLoading || !currentResult) return <Loader />;

  const correctCount = currentResult.questions.filter(
    (q) => q.isCorrect
  ).length;
  const finalScore = calculateScore(currentResult.difficulty, correctCount);
  const isPerfect = correctCount === currentResult.questions.length;

  if (data?.results) {
    console.log(data.results[count].correct_answer);
  }

  return (
    <section className={classes.gamePanel}>
      {gameOver ? (
        <div className={classes.gameEndMessage}>
          <h2>
            {gameOutcome === 'win' ? '🎉 Well done, you win!' : '💀 Game Over'}
          </h2>
          <p>
            You got {correctCount} of {currentResult.questions.length} correct.
          </p>
          <p>Your score: {finalScore}</p>
          {isPerfect && (
            <p className={classes.perfectRun}>
              Perfect run! Bonus multiplier applied.
            </p>
          )}
          <button className={classes.playAgainBtn} onClick={handlePlayAgain}>
            Play Again
          </button>
        </div>
      ) : (
        <div>
          <h4 className={classes.gameInfo}>
            {currentResult.category} category | {currentResult.difficulty} |{' '}
            {currentResult.score} points
          </h4>
          <h3>question {currentResult.questions[count].id + 1}</h3>
          <div className={classes.questionsContainer}>
            <h4
              className={classes.question}
              dangerouslySetInnerHTML={{
                __html: currentResult.questions[count].question,
              }}
            />
          </div>
          <div className={classes.optionsContainer}>
            {currentResult.questions[count].options.map((opt, i) => (
              <div
                key={i}
                className={`${classes.option} ${
                  selectedOption === opt ? classes.selected : ''
                }`}
                onClick={() => handleSelection(opt)}
              >
                <p dangerouslySetInnerHTML={{ __html: opt }} />
              </div>
            ))}
          </div>
          <div className={classes.feedbackContainer}>
            {feedback && <p className={classes.feedback}>{feedback}</p>}
          </div>
        </div>
      )}
    </section>
  );
};

export default GamePanel;
