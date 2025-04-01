import { useContext } from 'react';
import { GameSettingsContext } from '../../../context/GameSettingsContext';
import Leaderboard from '../Leaderboard/Leaderboard';
import classes from './SidePanel.module.scss';
import { IoMdSettings } from 'react-icons/io';

const SidePanel = () => {
  const { gameSettings, setGameSettings, gameStarted, setGameStarted } =
    useContext(GameSettingsContext);

  const isReady = gameSettings.difficulty && gameSettings.category;

  return (
    <aside className={classes.sidePanel}>
      <Leaderboard />
      <div className={classes.settingsHeader}>
        <p>game settings</p>
        <IoMdSettings className={classes.settingsLogo} />
      </div>

      <input
        disabled={gameStarted}
        type="text"
        placeholder="username"
        className={classes.input}
        value={gameSettings.username}
        onChange={(e) => {
          const inputValue = e.target.value;
          const newUsername =
            inputValue.length > 13 ? inputValue.slice(0, 13) : inputValue;
          setGameSettings({ ...gameSettings, username: newUsername });
        }}
      />

      <div className={classes.categories}>
        <p>category</p>
        <select
          disabled={gameStarted}
          value={gameSettings.category}
          onChange={(e) =>
            setGameSettings({ ...gameSettings, category: e.target.value })
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
        <button
          disabled={gameStarted}
          className={gameSettings.difficulty === 'easy' ? classes.active : ''}
          onClick={() =>
            setGameSettings({ ...gameSettings, difficulty: 'easy' })
          }
        >
          easy
        </button>
        <button
          disabled={gameStarted}
          className={gameSettings.difficulty === 'medium' ? classes.active : ''}
          onClick={() =>
            setGameSettings({ ...gameSettings, difficulty: 'medium' })
          }
        >
          medium
        </button>
        <button
          disabled={gameStarted}
          className={gameSettings.difficulty === 'hard' ? classes.active : ''}
          onClick={() =>
            setGameSettings({ ...gameSettings, difficulty: 'hard' })
          }
        >
          hard
        </button>
        <p className={classes.pointsMsg}>
          earn more points with higher difficulty!
        </p>
      </div>

      <button
        className={classes.start}
        disabled={!isReady}
        onClick={() => setGameStarted(true)}
      >
        start
      </button>
    </aside>
  );
};

export default SidePanel;
