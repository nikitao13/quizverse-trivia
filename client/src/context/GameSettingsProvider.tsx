import { useState, useEffect, ReactNode } from 'react';
import {
  GameSettingsContext,
  GameSettings,
  Results,
} from './GameSettingsContext';

interface GameSettingsProviderProps {
  children: ReactNode;
}

export const GameSettingsProvider = ({
  children,
}: GameSettingsProviderProps) => {
  const [gameSettings, setGameSettings] = useState<GameSettings>(() => {
    const savedSettings = localStorage.getItem('gameSettings');
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          difficulty: '',
          category: '',
          username: '',
        };
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [lastGameResult, setLastGameResult] = useState<Results | null>(null);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
  }, [gameSettings]);

  return (
    <GameSettingsContext.Provider
      value={{
        gameSettings,
        setGameSettings,
        gameStarted,
        setGameStarted,
        lastGameResult,
        setLastGameResult,
        gameOver,
        setGameOver,
      }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};
