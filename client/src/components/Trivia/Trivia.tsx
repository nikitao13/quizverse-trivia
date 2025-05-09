import { useContext } from 'react';
import GamePanel from './GamePanel/GamePanel';
import classes from './Trivia.module.scss';
import SidePanel from './SidePanel/SidePanel';
import { GameSettingsContext } from '../../context/GameSettingsContext';

const Trivia = () => {
  const { gameStarted, gameOver } = useContext(GameSettingsContext);
  return (
    <main className={classes.main}>
      <SidePanel />
      <section className={classes.gameContainer}>
        {(gameStarted || gameOver) && <GamePanel />}
      </section>
    </main>
  );
};

export default Trivia;
