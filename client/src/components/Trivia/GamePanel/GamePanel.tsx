import classes from './GamePanel.module.scss';
import { useTrivia } from '../../../hooks/useTrivia';

interface GamePanelProps {
  gameSettings: {
    difficulty: string;
    category: string;
    username: string;
  };
}

const GamePanel = ({ gameSettings }: GamePanelProps) => {
  const { data, isSuccess, isLoading } = useTrivia(gameSettings);
  if (isLoading) return <p>Loading...</p>;
  if (isSuccess) console.log(data.results);

  return (
    <section className={classes.gamePanel}>
      <h3>game panel</h3>
    </section>
  );
};
export default GamePanel;
