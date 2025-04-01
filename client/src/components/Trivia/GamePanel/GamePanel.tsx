import { useContext, useEffect, useState } from 'react';
import classes from './GamePanel.module.scss';
import { useTrivia } from '../../../hooks/useTrivia';
import {
  GameSettingsContext,
  Results,
} from '../../../context/GameSettingsContext';
import Loader from '../../Loader/Loader';
import { shuffleArray } from '../../../services/shuffleArray';

interface TriviaQuestion {
  question: string;
  type: string;
  incorrect_answers: string[];
  correct_answer: string;
}

const GamePanel = () => {
  const { gameSettings, gameStarted, setGameStarted, setLastGameResult } =
    useContext(GameSettingsContext);
  const { data, isSuccess, isLoading } = useTrivia(gameSettings, gameStarted);
  const [count, setCount] = useState(0);
  const [currentResult, setCurrentResult] = useState<Results | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (isSuccess && data && !currentResult) {
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
  }, [isSuccess, data, gameSettings.username, currentResult]);

  const handleSelection = (option: string) => {
    if (!currentResult || selectedOption) return;
    setSelectedOption(option);

    const isCorrect = option === currentResult.questions[count].correctAnswer;

    const updatedQuestions = [...currentResult.questions];
    updatedQuestions[count].userAnswer = option;
    updatedQuestions[count].isCorrect = isCorrect;

    let increment = 0;

    if (isCorrect) {
      if (currentResult.difficulty === 'easy') increment = 1;
      if (currentResult.difficulty === 'medium') increment = 2;
      if (currentResult.difficulty === 'hard') increment = 3;
    }

    const updatedResult = {
      ...currentResult,
      questions: updatedQuestions,
      score: currentResult.score + increment,
    };

    setCurrentResult(updatedResult);
    setFeedback(isCorrect ? 'Correct answer! ✅ ' : 'Incorrect answer! ❌');

    if (isCorrect) {
      setTimeout(() => {
        setFeedback(null);
        if (count < updatedQuestions.length - 1) {
          setSelectedOption(null);
          setCount((prev) => prev + 1);
        } else {
          setLastGameResult(updatedResult);
          setGameStarted(false);
        }
      }, 40000);
    } else {
      setTimeout(() => {
        setFeedback(null);
        setLastGameResult(updatedResult);
        setGameStarted(false);
      }, 40000);
    }
  };

  if (isLoading || !currentResult) return <Loader />;

  console.log(currentResult);

  return (
    <section className={classes.gamePanel}>
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
          {currentResult.questions[count].options.map((option, index) => (
            <div
              key={index}
              className={`${classes.option} ${
                selectedOption === option ? classes.selected : ''
              }`}
              onClick={() => handleSelection(option)}
            >
              <p dangerouslySetInnerHTML={{ __html: option }} />
            </div>
          ))}
        </div>
        <div className={classes.feedbackContainer}>
          {feedback && <p className={classes.feedback}>{feedback}</p>}
        </div>
      </div>
    </section>
  );
};

export default GamePanel;
