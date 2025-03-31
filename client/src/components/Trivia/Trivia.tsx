import { useEffect, useState } from 'react';
import GamePanel from './GamePanel/GamePanel';
import classes from './Trivia.module.scss';
import SidePanel from './SidePanel/SidePanel';

interface GameSettings {
  difficulty: string;
  category: string;
  username: string;
}

const defaultSettings: GameSettings = {
  difficulty: '',
  category: '',
  username: '',
};

const Trivia = () => {
  const [gameSettings, setGameSettings] = useState<GameSettings>(() => {
    const savedSettings = localStorage.getItem('gameSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
  }, [gameSettings]);

  return (
    <main className={classes.main}>
      <SidePanel
        gameSettings={gameSettings}
        setGameSettings={setGameSettings}
      />
      <section className={classes.gameContainer}>
        <h2>trivia</h2>
        {gameSettings && <GamePanel gameSettings={gameSettings} />}
      </section>
    </main>
  );
};

export default Trivia;
