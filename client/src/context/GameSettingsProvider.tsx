import { useState, useEffect, ReactNode } from 'react';
import { GameSettingsContext, GameSettings } from './GameSettingsContext';

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

  useEffect(() => {
    localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
  }, [gameSettings]);

  return (
    <GameSettingsContext.Provider
      value={{ gameSettings, setGameSettings, gameStarted, setGameStarted }}
    >
      {children}
    </GameSettingsContext.Provider>
  );
};
