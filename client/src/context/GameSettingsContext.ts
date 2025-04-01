import { createContext } from 'react';

export interface GameSettings {
  difficulty: string;
  category: string;
  username: string;
}

export interface Results {
  username: string;
  date: string;
  category: string;
  difficulty: string;
  score: number;
  questions: Array<{
    id: number;
    question: string;
    options: string[];
    correctAnswer: string;
    userAnswer: string;
    isCorrect: boolean;
  }>;
}

export interface GameSettingsContextProps {
  gameSettings: GameSettings;
  setGameSettings: (settings: GameSettings) => void;
  gameStarted: boolean;
  setGameStarted: (started: boolean) => void;
  lastGameResult: Results | null;
  setLastGameResult: (result: Results) => void;
}

const defaultSettings: GameSettings = {
  difficulty: '',
  category: '',
  username: '',
};

export const GameSettingsContext = createContext<GameSettingsContextProps>({
  gameSettings: defaultSettings,
  setGameSettings: () => {},
  gameStarted: false,
  setGameStarted: () => {},
  lastGameResult: null,
  setLastGameResult: () => {},
});
