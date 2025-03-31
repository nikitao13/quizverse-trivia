import { useContext } from 'react';
import classes from './GamePanel.module.scss';
import { useTrivia } from '../../../hooks/useTrivia';
import { GameSettingsContext } from '../../../context/GameSettingsContext';
import Loader from '../../Loader/Loader';

const GamePanel = () => {
  const { gameSettings, gameStarted } = useContext(GameSettingsContext);
  const { data, isSuccess, isLoading } = useTrivia(gameSettings, gameStarted);

  if (isLoading) return <Loader />;
  if (isSuccess) console.log(data.results);

  return (
    <section className={classes.gamePanel}>
      <h3>game panel</h3>
    </section>
  );
};

export default GamePanel;
