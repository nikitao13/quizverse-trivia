import classes from './SidePanel.module.scss';
import { IoMdSettings } from 'react-icons/io';

interface SidePanelProps {
  gameSettings: {
    difficulty: string;
    category: string;
    username: string;
  };
  setGameSettings: (settings: {
    difficulty: string;
    category: string;
    username: string;
  }) => void;
}

const SidePanel = ({ gameSettings, setGameSettings }: SidePanelProps) => {
  return (
    <aside className={classes.sidePanel}>
      <div className={classes.settingsHeader}>
        <p>user settings</p>
        <IoMdSettings className={classes.settingsLogo} />
      </div>

      <input
        type="text"
        placeholder="username"
        className={classes.input}
        value={gameSettings.username}
        onChange={(e) =>
          setGameSettings({ ...gameSettings, username: e.target.value })
        }
      />

      <div className={classes.categories}>
        <p>categories</p>
        <select
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
          className={gameSettings.difficulty === 'easy' ? classes.active : ''}
          onClick={() =>
            setGameSettings({ ...gameSettings, difficulty: 'easy' })
          }
        >
          easy
        </button>
        <button
          className={gameSettings.difficulty === 'medium' ? classes.active : ''}
          onClick={() =>
            setGameSettings({ ...gameSettings, difficulty: 'medium' })
          }
        >
          medium
        </button>
        <button
          className={gameSettings.difficulty === 'hard' ? classes.active : ''}
          onClick={() =>
            setGameSettings({ ...gameSettings, difficulty: 'hard' })
          }
        >
          hard
        </button>
      </div>
    </aside>
  );
};

export default SidePanel;
