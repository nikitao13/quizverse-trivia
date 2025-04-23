import { useContext } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { GameSettingsContext } from '../../../context/GameSettingsContext';
import Leaderboard from '../Leaderboard/Leaderboard';
import classes from './SidePanel.module.scss';
import { IoMdSettings } from 'react-icons/io';

const SidePanel = () => {
  const {
    gameSettings,
    setGameSettings,
    gameStarted,
    setGameStarted,
    gameOver,
    setGameOver,
  } = useContext(GameSettingsContext);
  const queryClient = useQueryClient();

  const isReady = Boolean(gameSettings.difficulty && gameSettings.category);

  const handleStart = () => {
    queryClient.removeQueries({
      queryKey: ['trivia', gameSettings.difficulty, gameSettings.category],
      exact: true,
    });

    setGameOver(false);
    setGameStarted(true);
  };

  return (
    <aside className={classes.sidePanel}>
      <Leaderboard />

      <div className={classes.settingsHeader}>
        <p>game settings</p>
        <IoMdSettings className={classes.settingsLogo} />
      </div>

      <input
        disabled={gameStarted && !gameOver}
        type="text"
        placeholder="username"
        className={classes.input}
        value={gameSettings.username}
        onChange={(e) => {
          const input = e.target.value.slice(0, 13);
          setGameSettings({ ...gameSettings, username: input });
        }}
      />

      <div className={classes.categories}>
        <p>category</p>
        <select
          disabled={gameStarted && !gameOver}
          value={gameSettings.category}
          onChange={(e) =>
            setGameSettings({
              ...gameSettings,
              category: e.target.value,
            })
          }
        >
          <option disabled value="">
            select category
          </option>
          <option value="0">any</option>
          <option value="21">sports</option>
          <option value="22">geography</option>
          <option value="23">history</option>
          <option value="15">video games</option>
          <option value="25">art</option>
          <option value="14">television</option>
        </select>
      </div>

      <div className={classes.difficultyButtons}>
        <p>difficulty</p>
        {(['easy', 'medium', 'hard'] as const).map((level) => (
          <button
            key={level}
            disabled={gameStarted && !gameOver}
            className={gameSettings.difficulty === level ? classes.active : ''}
            onClick={() =>
              setGameSettings({
                ...gameSettings,
                difficulty: level,
              })
            }
          >
            {level}
          </button>
        ))}
        <p className={classes.pointsMsg}>
          earn more points with higher difficulty!
        </p>
      </div>

      <button
        className={classes.start}
        disabled={!isReady}
        onClick={handleStart}
      >
        start
      </button>
    </aside>
  );
};

export default SidePanel;
