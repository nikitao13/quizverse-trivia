import { useContext } from 'react';
import GamePanel from './GamePanel/GamePanel';
import classes from './Trivia.module.scss';
import SidePanel from './SidePanel/SidePanel';
import { GameSettingsContext } from '../../context/GameSettingsContext';

const Trivia = () => {
  const { gameStarted } = useContext(GameSettingsContext);
  return (
    <main className={classes.main}>
      <SidePanel />
      <section className={classes.gameContainer}>
        <h2>trivia</h2>
        {gameStarted && <GamePanel />}
      </section>
    </main>
  );
};

export default Trivia;

// const gameData = {
//   username: 'nikitao13',
//   date: '2023-10-01',
//   gameDetails: {
//     category: 'sports',
//     difficulty: 'easy',
//     score: 10,
//     questions: [
//       {
//         question: 'What is the capital of France?',
//         options: ['Paris', 'London', 'Berlin', 'Madrid'],
//         correctAnswer: 'Paris',
//         userAnswer: 'Paris',
//         isCorrect: true,
//       },
//     ],
//   },
// };
