import { createContext } from 'react';

export interface GameSettings {
  difficulty: string;
  category: string;
  username: string;
}

export interface GameSettingsContextProps {
  gameSettings: GameSettings;
  setGameSettings: (settings: GameSettings) => void;
  gameStarted: boolean;
  // commented below for testing! uncomment when there is a setGameStarted(false) function
  // setGameStarted: (started: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setGameStarted: any;
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
});
